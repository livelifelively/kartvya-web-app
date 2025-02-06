import { Box, Chip, Group, Title } from '@mantine/core';
import { map, sortBy } from 'lodash';
import { SelectedRegion } from './state/onboarding.state';

type RegionLevel = 'state' | 'district' | 'loksabha' | 'vidhansabha' | 'vidhansabhaInLoksabha';

function getRegionData(allRegions: any, selectedRegions: SelectedRegion, level: RegionLevel) {
  switch (level) {
    case 'state':
      return allRegions;
    case 'district':
      return allRegions[selectedRegions.state!.region_name_id].districts;
    case 'loksabha':
      return allRegions[selectedRegions.state!.region_name_id].districts[selectedRegions.district!.region_name_id]
        .loksabha_constituencies;

    case 'vidhansabha':
      return allRegions[selectedRegions.state!.region_name_id].districts[selectedRegions.district!.region_name_id]
        .vidhansabha_constituencies;
    case 'vidhansabhaInLoksabha':
      return allRegions[selectedRegions.state!.region_name_id].districts[selectedRegions.district!.region_name_id]
        .loksabha_constituencies[selectedRegions.loksabhaConstituency!.region_name_id].vidhansabha_constituencies;
  }
}

export function SelectRegions({
  allRegions,
  selectedRegions,
  onSelectedRegionsChanged,
}: {
  allRegions: any;
  selectedRegions: SelectedRegion;
  onSelectedRegionsChanged: (selectedRegions: SelectedRegion) => void;
}) {
  const selectState = (stateRegionId: string) => {
    const stateData = getRegionData(allRegions, selectedRegions, 'state')[stateRegionId];

    const state = {
      region_name_id: stateRegionId,
      name: stateData.name,
      name_id: stateData.name_id,
    };

    onSelectedRegionsChanged({
      ...selectedRegions,
      state,
      district: null,
      loksabhaConstituency: null,
      vidhansabhaConstituency: null,
    });
  };

  const selectDistrict = (districtRegionId: string) => {
    if (!selectedRegions.state) {
      return;
    }

    const districtData = getRegionData(allRegions, selectedRegions, 'district')[districtRegionId];

    const { name, name_id, region_name_id } = districtData;

    const district = {
      region_name_id,
      name,
      name_id,
    };

    onSelectedRegionsChanged({
      ...selectedRegions,
      district,
      loksabhaConstituency: null,
      vidhansabhaConstituency: null,
    });
  };

  const selectLoksabha = (loksabhaRegionId: string) => {
    if (!selectedRegions.state || !selectedRegions.district) {
      return;
    }

    const loksabhaData = getRegionData(allRegions, selectedRegions, 'loksabha')[loksabhaRegionId];

    const loksabha = {
      region_name_id: loksabhaRegionId,
      name: loksabhaData.name,
      name_id: loksabhaData.name_id,
    };

    onSelectedRegionsChanged({
      ...selectedRegions,
      loksabhaConstituency: loksabha,
      vidhansabhaConstituency: null,
    });
  };

  const selectVidhansabha = (vidhansabhaRegionId: string) => {
    if (!selectedRegions.state || !selectedRegions.district || !selectedRegions.loksabhaConstituency) {
      return;
    }

    const vidhansabhaData = getRegionData(allRegions, selectedRegions, 'vidhansabha');

    const vidhansabha = {
      region_name_id: vidhansabhaRegionId,
      name: vidhansabhaData[vidhansabhaRegionId].name,
      name_id: vidhansabhaData[vidhansabhaRegionId].name_id,
    };

    onSelectedRegionsChanged({
      ...selectedRegions,
      vidhansabhaConstituency: vidhansabha,
    });
  };

  return (
    <>
      <Box mb={32}>
        <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
          Select State
        </Title>
        <Chip.Group value={selectedRegions.state?.region_name_id} onChange={selectState} multiple={false}>
          <Group mt="xs">
            {map(sortBy(allRegions, 'name'), (state) => (
              <Chip key={state.region_name_id} value={state.region_name_id} variant="outline">
                {state.name}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </Box>
      {selectedRegions.state && (
        <Box mb={32}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            Select District
          </Title>
          <Chip.Group value={selectedRegions.district?.region_name_id} onChange={selectDistrict} multiple={false}>
            <Group mt="xs">
              {map(sortBy(getRegionData(allRegions, selectedRegions, 'district'), 'name'), (district) => (
                <Chip key={district.region_name_id} value={district.region_name_id} variant="outline">
                  {district.name}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Box>
      )}
      {selectedRegions.state && selectedRegions.district && (
        <Box mb={32}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            Select Loksabha Constituency
          </Title>
          <Chip.Group
            value={selectedRegions.loksabhaConstituency?.region_name_id}
            onChange={selectLoksabha}
            multiple={false}
          >
            <Group mt="xs">
              {map(
                sortBy(getRegionData(allRegions, selectedRegions, 'loksabha'), (loksabha) => loksabha.name),
                (loksabha) => (
                  <Chip key={loksabha.region_name_id} value={loksabha.region_name_id} variant="outline">
                    {loksabha.name}
                  </Chip>
                )
              )}
            </Group>
          </Chip.Group>
        </Box>
      )}

      {selectedRegions.state && selectedRegions.district && selectedRegions.loksabhaConstituency && (
        <Box mb={32}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            Select Vidhansabha Constituency
          </Title>
          <Chip.Group
            value={selectedRegions.vidhansabhaConstituency?.region_name_id}
            onChange={selectVidhansabha}
            multiple={false}
          >
            <Group mt="xs">
              {map(
                sortBy(
                  getRegionData(allRegions, selectedRegions, 'vidhansabhaInLoksabha'),
                  (vidhansabha) => vidhansabha.name
                ),
                (vidhansabha) => (
                  <Chip key={vidhansabha.region_name_id} value={vidhansabha.region_name_id} variant="outline">
                    {vidhansabha.name}
                  </Chip>
                )
              )}
            </Group>
          </Chip.Group>
        </Box>
      )}
    </>
  );
}
