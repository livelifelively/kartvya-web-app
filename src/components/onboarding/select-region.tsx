import { Box, Chip, Group, Title } from '@mantine/core';
import { map } from 'lodash';
import { SelectedRegion } from './state/onboarding.state';

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
    onSelectedRegionsChanged({
      state: stateRegionId,
      district: '',
      loksabhaConstituency: '',
      vidhansabhaConstituency: '',
    });
  };

  const selectDistrict = (districtRegionId: string) => {
    onSelectedRegionsChanged({
      ...selectedRegions,
      district: districtRegionId,
      loksabhaConstituency: '',
      vidhansabhaConstituency: '',
    });
  };

  const selectLoksabha = (loksabhaRegionId: string) => {
    onSelectedRegionsChanged({
      ...selectedRegions,
      loksabhaConstituency: loksabhaRegionId,
      vidhansabhaConstituency: '',
    });
  };

  const selectVidhansabha = (vidhansabhaRegionId: string) => {
    onSelectedRegionsChanged({
      ...selectedRegions,
      vidhansabhaConstituency: vidhansabhaRegionId,
    });
  };

  return (
    <>
      <Box mb={32}>
        <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
          Select State
        </Title>
        <Chip.Group value={selectedRegions.state} onChange={selectState} multiple={false}>
          <Group mt="xs">
            {map(allRegions, (state) => (
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
          <Chip.Group value={selectedRegions.district} onChange={selectDistrict} multiple={false}>
            <Group mt="xs">
              {map(allRegions[selectedRegions.state].districts, (district) => (
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
          <Chip.Group value={selectedRegions.loksabhaConstituency} onChange={selectLoksabha} multiple={false}>
            <Group mt="xs">
              {map(
                allRegions[selectedRegions.state]?.districts[selectedRegions.district]?.loksabha_constituencies,
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
          <Chip.Group value={selectedRegions.vidhansabhaConstituency} onChange={selectVidhansabha} multiple={false}>
            <Group mt="xs">
              {map(
                allRegions[selectedRegions.state]?.districts[selectedRegions.district]?.loksabha_constituencies[
                  selectedRegions.loksabhaConstituency
                ]?.vidhansabha_constituencies,
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
