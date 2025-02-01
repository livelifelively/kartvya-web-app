import React, { useState } from 'react';
import { Grid, Checkbox, Text } from '@mantine/core';
import { regionsData } from './in-state-districts-data';

export function SelectRegions() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedLokSabha, setSelectedLokSabha] = useState<string[]>([]);
  const [selectedVidhanSabha, setSelectedVidhanSabha] = useState<string[]>([]);

  const countries = regionsData.map((region: any) => ({
    value: region.name,
    label: region.name,
  }));

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedStates([]); // Reset states when country changes
    setSelectedDistrict(null); // Reset district when country changes
    setSelectedLokSabha([]); // Reset Lok Sabha when country changes
    setSelectedVidhanSabha([]); // Reset Vidhan Sabha when country changes
  };

  const handleStateChange = (value: string) => {
    if (selectedStates.includes(value)) {
      setSelectedStates(selectedStates.filter((state) => state !== value));
    } else {
      setSelectedStates([...selectedStates, value]);
    }
    setSelectedDistrict(null); // Reset district when state changes
    setSelectedLokSabha([]); // Reset Lok Sabha when state changes
    setSelectedVidhanSabha([]); // Reset Vidhan Sabha when state changes
  };

  const states = selectedCountry
    ? regionsData.find((region) => region.name === selectedCountry)?.states || []
    : [];

  const districts = selectedStates.length > 0 ? states.flatMap((state) => state.districts) : [];

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedLokSabha([]); // Reset Lok Sabha when district changes
    setSelectedVidhanSabha([]); // Reset Vidhan Sabha when district changes
  };

  const lokSabhaConstituencies = selectedDistrict
    ? districts
        .find((district) => district.name === selectedDistrict)
        ?.dvl.filter((constituency) => constituency.loksabha_constituency) || []
    : [];

  const vidhanSabhaConstituencies = selectedDistrict
    ? districts
        .find((district) => district.name === selectedDistrict)
        ?.dvl.filter((constituency) => constituency.vidhansabha_constituency) || []
    : [];

  return (
    <Grid>
      <Grid.Col span={6}>
        {/* GeoJSON map will be rendered here */}
        {/* You can integrate your map component here and pass selectedLokSabha and selectedVidhanSabha as props */}
        <Text>GeoJSON map placeholder</Text>
      </Grid.Col>
      <Grid.Col span={6}>
        <Text w={500} size="lg" mb="md">
          Select Regions to Follow
        </Text>
        <Text w={500} mb="md">
          Select Country
        </Text>
        {countries.map((country) => (
          <Checkbox
            key={country.value}
            label={country.label}
            checked={selectedCountry === country.value}
            onChange={() => handleCountryChange(country.value)}
          />
        ))}

        {selectedCountry && (
          <>
            <Text w={500} mb="md">
              Select States
            </Text>
            {states.map((state) => (
              <Checkbox
                key={state.name}
                label={state.name}
                checked={selectedStates.includes(state.name)}
                onChange={() => handleStateChange(state.name)}
              />
            ))}
          </>
        )}

        {selectedStates.length > 0 && (
          <>
            <Text w={500} mb="md">
              Select District
            </Text>
            {districts.map((district) => (
              <Checkbox
                key={district.name}
                label={district.name}
                checked={selectedDistrict === district.name}
                onChange={() => handleDistrictChange(district.name)}
              />
            ))}
          </>
        )}

        {selectedDistrict && (
          <>
            <Text w={500} mb="md">
              Lok Sabha Constituencies
            </Text>
            {lokSabhaConstituencies.map((constituency) => (
              <Checkbox
                key={constituency.loksabha_constituency}
                label={constituency.loksabha_constituency}
                checked={selectedLokSabha.includes(constituency.loksabha_constituency)}
                onChange={() => {
                  if (selectedLokSabha.includes(constituency.loksabha_constituency)) {
                    setSelectedLokSabha(
                      selectedLokSabha.filter((c) => c !== constituency.loksabha_constituency)
                    );
                  } else {
                    setSelectedLokSabha([...selectedLokSabha, constituency.loksabha_constituency]);
                  }
                }}
              />
            ))}

            <Text w={500} mb="md">
              Vidhan Sabha Constituencies
            </Text>
            {vidhanSabhaConstituencies.map((constituency) => (
              <Checkbox
                key={constituency.vidhansabha_constituency}
                label={constituency.vidhansabha_constituency}
                checked={selectedVidhanSabha.includes(constituency.vidhansabha_constituency)}
                onChange={() => {
                  if (selectedVidhanSabha.includes(constituency.vidhansabha_constituency)) {
                    setSelectedVidhanSabha(
                      selectedVidhanSabha.filter((c) => c !== constituency.vidhansabha_constituency)
                    );
                  } else {
                    setSelectedVidhanSabha([
                      ...selectedVidhanSabha,
                      constituency.vidhansabha_constituency,
                    ]);
                  }
                }}
              />
            ))}
          </>
        )}
      </Grid.Col>
    </Grid>
  );
}
