import { Checkbox } from '@mantine/core';

export function SelectRegions({
  allRegions,
  selectedRegions,
  onSelectedRegionsChanged,
}: {
  allRegions: any[];
  selectedRegions: any[];
  onSelectedRegionsChanged: (selectedRegions: any[]) => void;
}) {
  return (
    <Checkbox.Group
      value={selectedRegions}
      onChange={(value) => {
        onSelectedRegionsChanged(value);
      }}
    >
      {allRegions.map((region) => (
        <Checkbox.Card key={region.id} value={region.id} />
      ))}
    </Checkbox.Group>
  );
}
