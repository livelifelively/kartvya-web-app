import { Box, Group, Radio, Title } from '@mantine/core';
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
        <Radio.Group name="state" onChange={(value) => selectState(value)}>
          <Group mt="xs">
            {map(allRegions, (state) => (
              <Radio key={state.region_name_id} value={state.region_name_id} label={state.name} />
            ))}
          </Group>
        </Radio.Group>
      </Box>
      {selectedRegions.state && (
        <Box mb={32}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            Select District
          </Title>
          <Radio.Group name="district" onChange={(value) => selectDistrict(value)}>
            <Group mt="xs">
              {map(allRegions[selectedRegions.state].districts, (district) => (
                <Radio key={district.region_name_id} value={district.region_name_id} label={district.name} />
              ))}
            </Group>
          </Radio.Group>
        </Box>
      )}
      {selectedRegions.state && selectedRegions.district && (
        <Box mb={32}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            Select Loksabha Constituency
          </Title>
          <Radio.Group name="loksabha" onChange={(value) => selectLoksabha(value)}>
            <Group mt="xs">
              {map(
                allRegions[selectedRegions.state]?.districts[selectedRegions.district]?.loksabha_constituencies,
                (loksabha) => (
                  <Radio key={loksabha.region_name_id} value={loksabha.region_name_id} label={loksabha.name} />
                )
              )}
            </Group>
          </Radio.Group>
        </Box>
      )}

      {selectedRegions.state && selectedRegions.district && selectedRegions.loksabhaConstituency && (
        <Box mb={32}>
          <Title mb={16} size="h4" style={{ textTransform: 'uppercase' }}>
            Select Vidhansabha Constituency
          </Title>
          <Radio.Group name="vidhansabha" onChange={(value) => selectVidhansabha(value)}>
            <Group mt="xs">
              {map(
                allRegions[selectedRegions.state]?.districts[selectedRegions.district]?.loksabha_constituencies[
                  selectedRegions.loksabhaConstituency
                ]?.vidhansabha_constituencies,
                (vidhansabha) => (
                  <Radio key={vidhansabha.region_name_id} value={vidhansabha.region_name_id} label={vidhansabha.name} />
                )
              )}
            </Group>
          </Radio.Group>
        </Box>
      )}
    </>
  );
}
