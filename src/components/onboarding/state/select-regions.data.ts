// to convert data from dgraph response
export function adaptFromDgraph(regions: any) {
  return regions.map((state: any) => {
    return {
      name_id: state.name_id,
      names: state.names.map((v: any) => v.name),
      region_name_id: state.active_version.region.name_id,
      districts: state.active_version.region.districts.map((d: any) => {
        return {
          name: d.self.names[0].name,
          all_names: d.self.names.map((v: any) => v.name),
          region_name_id: d.name_id,
          name_id: d.self.name_id,
          vidhansabha_constituencies: d.vidhansabha_constituencies.map((v: any) => v.name_id),
          loksabha_constituencies: d.loksabha_constituencies.map((v: any) => v.name_id),
        };
      }),
      loksabha_constituencies: state.active_version.region.loksabha_constituencies.map((d: any) => {
        return {
          name: d.self.names[0].name,
          all_names: d.self.names.map((v: any) => v.name),
          region_name_id: d.name_id,
          name_id: d.self.name_id,
          vidhansabha_constituencies: d.vidhansabha_constituencies.map((v: any) => v.name_id),
        };
      }),
      vidhansabha_constituencies: state.active_version.region.vidhansabha_constituencies.map((d: any) => {
        return {
          name: d.self.names[0].name,
          all_names: d.self.names.map((v: any) => v.name),
          region_name_id: d.name_id,
          name_id: d.self.name_id,
          loksabha_constituencies: d.loksabha_constituencies.map((v: any) => v.name_id),
        };
      }),
    };
  });
}

export function transformData(region: any) {
  return region.reduce((acc: any, state: any) => {
    const { name_id, region_name_id, names, districts, loksabha_constituencies, vidhansabha_constituencies } = state;

    acc[region_name_id] = {
      name: names[0],
      name_id,
      region_name_id: state.region_name_id,
      districts: districts.reduce((acc: any, district: any) => {
        const loksabhasInDistrict = loksabha_constituencies.filter((l: any) =>
          district.loksabha_constituencies.includes(l.region_name_id)
        );
        const vidhansabhasInDistrict = vidhansabha_constituencies.filter((v: any) =>
          district.vidhansabha_constituencies.includes(v.region_name_id)
        );

        acc[district.region_name_id] = {
          name: district.name,
          name_id: district.name_id,
          region_name_id: district.region_name_id,
          loksabha_constituencies: loksabhasInDistrict.reduce((acc: any, lokSabha: any) => {
            acc[lokSabha.region_name_id] = {
              name: lokSabha.name,
              region_name_id: lokSabha.region_name_id,
              name_id: lokSabha.name_id,
              vidhansabha_constituencies: vidhansabhasInDistrict
                .filter((vidhanSabha: any) => vidhanSabha.loksabha_constituencies.includes(lokSabha.region_name_id))
                .map((vs: any) => {
                  return {
                    name: vs.name,
                    region_name_id: vs.region_name_id,
                    name_id: vs.name_id,
                  };
                }),
            };

            return acc;
          }, {}),
          vidhansabha_constituencies: vidhansabhasInDistrict.reduce((acc: any, vidhanSabha: any) => {
            acc[vidhanSabha.region_name_id] = {
              name: vidhanSabha.name,
              name_id: vidhanSabha.name_id,
              region_name_id: vidhanSabha.region_name_id,
              loksabha_constituencies: loksabhasInDistrict
                .filter((lokSabha: any) => vidhanSabha.loksabha_constituencies.includes(lokSabha.region_name_id))
                .map((ls: any) => {
                  return {
                    name: ls.name,
                    region_name_id: ls.region_name_id,
                    name_id: ls.name_id,
                  };
                }),
            };

            return acc;
          }, {}),
        };

        return acc;
      }, {}),
    };

    return acc;
  }, {});
}

export const statesData = {
  'in-sut-himachal-pradesh-version-25-region': {
    name: 'Himachal Pradesh',
    name_id: 'in-sut-himachal-pradesh',
    region_name_id: 'in-sut-himachal-pradesh-version-25-region',
    districts: {
      'in-d-hp-bilaspur-version-25-region': {
        name: 'Bilaspur',
        name_id: 'in-d-hp-bilaspur',
        region_name_id: 'in-d-hp-bilaspur-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-hamirpur-version-25-region': {
            name: 'Hamirpur',
            region_name_id: 'in-lc-hp-hamirpur-version-25-region',
            name_id: 'in-lc-hp-hamirpur',
            vidhansabha_constituencies: [
              {
                name: 'Jhanduta',
                region_name_id: 'in-vc-hp-jhanduta-version-25-region',
                name_id: 'in-vc-hp-jhanduta',
              },
              {
                name: 'Ghumarwin',
                region_name_id: 'in-vc-hp-ghumarwin-version-25-region',
                name_id: 'in-vc-hp-ghumarwin',
              },
              {
                name: 'Bilaspur',
                region_name_id: 'in-vc-hp-bilaspur-version-25-region',
                name_id: 'in-vc-hp-bilaspur',
              },
              {
                name: 'Sri Naina Deviji',
                region_name_id: 'in-vc-hp-sri-naina-deviji-version-25-region',
                name_id: 'in-vc-hp-sri-naina-deviji',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-jhanduta-version-25-region': {
            name: 'Jhanduta',
            name_id: 'in-vc-hp-jhanduta',
            region_name_id: 'in-vc-hp-jhanduta-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-ghumarwin-version-25-region': {
            name: 'Ghumarwin',
            name_id: 'in-vc-hp-ghumarwin',
            region_name_id: 'in-vc-hp-ghumarwin-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-bilaspur-version-25-region': {
            name: 'Bilaspur',
            name_id: 'in-vc-hp-bilaspur',
            region_name_id: 'in-vc-hp-bilaspur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-sri-naina-deviji-version-25-region': {
            name: 'Sri Naina Deviji',
            name_id: 'in-vc-hp-sri-naina-deviji',
            region_name_id: 'in-vc-hp-sri-naina-deviji-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
        },
      },
      'in-d-hp-chamba-version-25-region': {
        name: 'Chamba',
        name_id: 'in-d-hp-chamba',
        region_name_id: 'in-d-hp-chamba-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-kangra-version-25-region': {
            name: 'Kangra',
            region_name_id: 'in-lc-hp-kangra-version-25-region',
            name_id: 'in-lc-hp-kangra',
            vidhansabha_constituencies: [
              {
                name: 'Churah',
                region_name_id: 'in-vc-hp-churah-version-25-region',
                name_id: 'in-vc-hp-churah',
              },
              {
                name: 'Chamba',
                region_name_id: 'in-vc-hp-chamba-version-25-region',
                name_id: 'in-vc-hp-chamba',
              },
              {
                name: 'Dalhousie',
                region_name_id: 'in-vc-hp-dalhousie-version-25-region',
                name_id: 'in-vc-hp-dalhousie',
              },
              {
                name: 'Bhattiyat',
                region_name_id: 'in-vc-hp-bhattiyat-version-25-region',
                name_id: 'in-vc-hp-bhattiyat',
              },
            ],
          },
          'in-lc-hp-mandi-version-25-region': {
            name: 'Mandi',
            region_name_id: 'in-lc-hp-mandi-version-25-region',
            name_id: 'in-lc-hp-mandi',
            vidhansabha_constituencies: [
              {
                name: 'Bharmour',
                region_name_id: 'in-vc-hp-bharmour-version-25-region',
                name_id: 'in-vc-hp-bharmour',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-churah-version-25-region': {
            name: 'Churah',
            name_id: 'in-vc-hp-churah',
            region_name_id: 'in-vc-hp-churah-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-bharmour-version-25-region': {
            name: 'Bharmour',
            name_id: 'in-vc-hp-bharmour',
            region_name_id: 'in-vc-hp-bharmour-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-chamba-version-25-region': {
            name: 'Chamba',
            name_id: 'in-vc-hp-chamba',
            region_name_id: 'in-vc-hp-chamba-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-dalhousie-version-25-region': {
            name: 'Dalhousie',
            name_id: 'in-vc-hp-dalhousie',
            region_name_id: 'in-vc-hp-dalhousie-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-bhattiyat-version-25-region': {
            name: 'Bhattiyat',
            name_id: 'in-vc-hp-bhattiyat',
            region_name_id: 'in-vc-hp-bhattiyat-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
        },
      },
      'in-d-hp-hamirpur-version-25-region': {
        name: 'Hamirpur',
        name_id: 'in-d-hp-hamirpur',
        region_name_id: 'in-d-hp-hamirpur-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-hamirpur-version-25-region': {
            name: 'Hamirpur',
            region_name_id: 'in-lc-hp-hamirpur-version-25-region',
            name_id: 'in-lc-hp-hamirpur',
            vidhansabha_constituencies: [
              {
                name: 'Bhoranj',
                region_name_id: 'in-vc-hp-bhoranj-version-25-region',
                name_id: 'in-vc-hp-bhoranj',
              },
              {
                name: 'Sujanpur',
                region_name_id: 'in-vc-hp-sujanpur-version-25-region',
                name_id: 'in-vc-hp-sujanpur',
              },
              {
                name: 'Hamirpur',
                region_name_id: 'in-vc-hp-hamirpur-version-25-region',
                name_id: 'in-vc-hp-hamirpur',
              },
              {
                name: 'Barsar',
                region_name_id: 'in-vc-hp-barsar-version-25-region',
                name_id: 'in-vc-hp-barsar',
              },
              {
                name: 'Nadaun',
                region_name_id: 'in-vc-hp-nadaun-version-25-region',
                name_id: 'in-vc-hp-nadaun',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-bhoranj-version-25-region': {
            name: 'Bhoranj',
            name_id: 'in-vc-hp-bhoranj',
            region_name_id: 'in-vc-hp-bhoranj-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-sujanpur-version-25-region': {
            name: 'Sujanpur',
            name_id: 'in-vc-hp-sujanpur',
            region_name_id: 'in-vc-hp-sujanpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-hamirpur-version-25-region': {
            name: 'Hamirpur',
            name_id: 'in-vc-hp-hamirpur',
            region_name_id: 'in-vc-hp-hamirpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-barsar-version-25-region': {
            name: 'Barsar',
            name_id: 'in-vc-hp-barsar',
            region_name_id: 'in-vc-hp-barsar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-nadaun-version-25-region': {
            name: 'Nadaun',
            name_id: 'in-vc-hp-nadaun',
            region_name_id: 'in-vc-hp-nadaun-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
        },
      },
      'in-d-hp-kangra-version-25-region': {
        name: 'Kangra',
        name_id: 'in-d-hp-kangra',
        region_name_id: 'in-d-hp-kangra-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-kangra-version-25-region': {
            name: 'Kangra',
            region_name_id: 'in-lc-hp-kangra-version-25-region',
            name_id: 'in-lc-hp-kangra',
            vidhansabha_constituencies: [
              {
                name: 'Nurpur',
                region_name_id: 'in-vc-hp-nurpur-version-25-region',
                name_id: 'in-vc-hp-nurpur',
              },
              {
                name: 'Indora',
                region_name_id: 'in-vc-hp-indora-version-25-region',
                name_id: 'in-vc-hp-indora',
              },
              {
                name: 'Fatehpur',
                region_name_id: 'in-vc-hp-fatehpur-version-25-region',
                name_id: 'in-vc-hp-fatehpur',
              },
              {
                name: 'Jawali',
                region_name_id: 'in-vc-hp-jawali-version-25-region',
                name_id: 'in-vc-hp-jawali',
              },
              {
                name: 'Dehra',
                region_name_id: 'in-vc-hp-dehra-version-25-region',
                name_id: 'in-vc-hp-dehra',
              },
              {
                name: 'Jawalamukhi',
                region_name_id: 'in-vc-hp-jawalamukhi-version-25-region',
                name_id: 'in-vc-hp-jawalamukhi',
              },
              {
                name: 'Jaisinghpur',
                region_name_id: 'in-vc-hp-jaisinghpur-version-25-region',
                name_id: 'in-vc-hp-jaisinghpur',
              },
              {
                name: 'Sullah',
                region_name_id: 'in-vc-hp-sullah-version-25-region',
                name_id: 'in-vc-hp-sullah',
              },
              {
                name: 'Nagrota',
                region_name_id: 'in-vc-hp-nagrota-version-25-region',
                name_id: 'in-vc-hp-nagrota',
              },
              {
                name: 'Kangra',
                region_name_id: 'in-vc-hp-kangra-version-25-region',
                name_id: 'in-vc-hp-kangra',
              },
              {
                name: 'Shahpur',
                region_name_id: 'in-vc-hp-shahpur-version-25-region',
                name_id: 'in-vc-hp-shahpur',
              },
              {
                name: 'Dharamshala',
                region_name_id: 'in-vc-hp-dharamshala-version-25-region',
                name_id: 'in-vc-hp-dharamshala',
              },
              {
                name: 'Palampur',
                region_name_id: 'in-vc-hp-palampur-version-25-region',
                name_id: 'in-vc-hp-palampur',
              },
              {
                name: 'Baijnath',
                region_name_id: 'in-vc-hp-baijnath-version-25-region',
                name_id: 'in-vc-hp-baijnath',
              },
            ],
          },
          'in-lc-hp-hamirpur-version-25-region': {
            name: 'Hamirpur',
            region_name_id: 'in-lc-hp-hamirpur-version-25-region',
            name_id: 'in-lc-hp-hamirpur',
            vidhansabha_constituencies: [
              {
                name: 'Dehra',
                region_name_id: 'in-vc-hp-dehra-version-25-region',
                name_id: 'in-vc-hp-dehra',
              },
              {
                name: 'Jaswan-Pragpur',
                region_name_id: 'in-vc-hp-jaswan-pragpur-version-25-region',
                name_id: 'in-vc-hp-jaswan-pragpur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-nurpur-version-25-region': {
            name: 'Nurpur',
            name_id: 'in-vc-hp-nurpur',
            region_name_id: 'in-vc-hp-nurpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-indora-version-25-region': {
            name: 'Indora',
            name_id: 'in-vc-hp-indora',
            region_name_id: 'in-vc-hp-indora-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-fatehpur-version-25-region': {
            name: 'Fatehpur',
            name_id: 'in-vc-hp-fatehpur',
            region_name_id: 'in-vc-hp-fatehpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-jawali-version-25-region': {
            name: 'Jawali',
            name_id: 'in-vc-hp-jawali',
            region_name_id: 'in-vc-hp-jawali-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-dehra-version-25-region': {
            name: 'Dehra',
            name_id: 'in-vc-hp-dehra',
            region_name_id: 'in-vc-hp-dehra-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-jaswan-pragpur-version-25-region': {
            name: 'Jaswan-Pragpur',
            name_id: 'in-vc-hp-jaswan-pragpur',
            region_name_id: 'in-vc-hp-jaswan-pragpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-jawalamukhi-version-25-region': {
            name: 'Jawalamukhi',
            name_id: 'in-vc-hp-jawalamukhi',
            region_name_id: 'in-vc-hp-jawalamukhi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-jaisinghpur-version-25-region': {
            name: 'Jaisinghpur',
            name_id: 'in-vc-hp-jaisinghpur',
            region_name_id: 'in-vc-hp-jaisinghpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-sullah-version-25-region': {
            name: 'Sullah',
            name_id: 'in-vc-hp-sullah',
            region_name_id: 'in-vc-hp-sullah-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-nagrota-version-25-region': {
            name: 'Nagrota',
            name_id: 'in-vc-hp-nagrota',
            region_name_id: 'in-vc-hp-nagrota-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-kangra-version-25-region': {
            name: 'Kangra',
            name_id: 'in-vc-hp-kangra',
            region_name_id: 'in-vc-hp-kangra-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-shahpur-version-25-region': {
            name: 'Shahpur',
            name_id: 'in-vc-hp-shahpur',
            region_name_id: 'in-vc-hp-shahpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-dharamshala-version-25-region': {
            name: 'Dharamshala',
            name_id: 'in-vc-hp-dharamshala',
            region_name_id: 'in-vc-hp-dharamshala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-palampur-version-25-region': {
            name: 'Palampur',
            name_id: 'in-vc-hp-palampur',
            region_name_id: 'in-vc-hp-palampur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
          'in-vc-hp-baijnath-version-25-region': {
            name: 'Baijnath',
            name_id: 'in-vc-hp-baijnath',
            region_name_id: 'in-vc-hp-baijnath-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Kangra',
                region_name_id: 'in-lc-hp-kangra-version-25-region',
                name_id: 'in-lc-hp-kangra',
              },
            ],
          },
        },
      },
      'in-d-hp-kinnaur-version-25-region': {
        name: 'Kinnaur',
        name_id: 'in-d-hp-kinnaur',
        region_name_id: 'in-d-hp-kinnaur-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-mandi-version-25-region': {
            name: 'Mandi',
            region_name_id: 'in-lc-hp-mandi-version-25-region',
            name_id: 'in-lc-hp-mandi',
            vidhansabha_constituencies: [
              {
                name: 'Kinnaur',
                region_name_id: 'in-vc-hp-kinnaur-version-25-region',
                name_id: 'in-vc-hp-kinnaur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-kinnaur-version-25-region': {
            name: 'Kinnaur',
            name_id: 'in-vc-hp-kinnaur',
            region_name_id: 'in-vc-hp-kinnaur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
        },
      },
      'in-d-hp-kullu-version-25-region': {
        name: 'Kullu',
        name_id: 'in-d-hp-kullu',
        region_name_id: 'in-d-hp-kullu-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-mandi-version-25-region': {
            name: 'Mandi',
            region_name_id: 'in-lc-hp-mandi-version-25-region',
            name_id: 'in-lc-hp-mandi',
            vidhansabha_constituencies: [
              {
                name: 'Manali',
                region_name_id: 'in-vc-hp-manali-version-25-region',
                name_id: 'in-vc-hp-manali',
              },
              {
                name: 'Kullu',
                region_name_id: 'in-vc-hp-kullu-version-25-region',
                name_id: 'in-vc-hp-kullu',
              },
              {
                name: 'Banjar',
                region_name_id: 'in-vc-hp-banjar-version-25-region',
                name_id: 'in-vc-hp-banjar',
              },
              {
                name: 'Anni',
                region_name_id: 'in-vc-hp-anni-version-25-region',
                name_id: 'in-vc-hp-anni',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-manali-version-25-region': {
            name: 'Manali',
            name_id: 'in-vc-hp-manali',
            region_name_id: 'in-vc-hp-manali-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-kullu-version-25-region': {
            name: 'Kullu',
            name_id: 'in-vc-hp-kullu',
            region_name_id: 'in-vc-hp-kullu-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-banjar-version-25-region': {
            name: 'Banjar',
            name_id: 'in-vc-hp-banjar',
            region_name_id: 'in-vc-hp-banjar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-anni-version-25-region': {
            name: 'Anni',
            name_id: 'in-vc-hp-anni',
            region_name_id: 'in-vc-hp-anni-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
        },
      },
      'in-d-hp-lahaul-spiti-version-25-region': {
        name: 'Lahaul and Spiti',
        name_id: 'in-d-hp-lahaul-spiti',
        region_name_id: 'in-d-hp-lahaul-spiti-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-mandi-version-25-region': {
            name: 'Mandi',
            region_name_id: 'in-lc-hp-mandi-version-25-region',
            name_id: 'in-lc-hp-mandi',
            vidhansabha_constituencies: [
              {
                name: 'Lahaul and Spiti',
                region_name_id: 'in-vc-hp-lahaul-spiti-version-25-region',
                name_id: 'in-vc-hp-lahaul-spiti',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-lahaul-spiti-version-25-region': {
            name: 'Lahaul and Spiti',
            name_id: 'in-vc-hp-lahaul-spiti',
            region_name_id: 'in-vc-hp-lahaul-spiti-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
        },
      },
      'in-d-hp-mandi-version-25-region': {
        name: 'Mandi',
        name_id: 'in-d-hp-mandi',
        region_name_id: 'in-d-hp-mandi-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-mandi-version-25-region': {
            name: 'Mandi',
            region_name_id: 'in-lc-hp-mandi-version-25-region',
            name_id: 'in-lc-hp-mandi',
            vidhansabha_constituencies: [
              {
                name: 'Karsog',
                region_name_id: 'in-vc-hp-karsog-version-25-region',
                name_id: 'in-vc-hp-karsog',
              },
              {
                name: 'Sundernagar',
                region_name_id: 'in-vc-hp-sundernagar-version-25-region',
                name_id: 'in-vc-hp-sundernagar',
              },
              {
                name: 'Nachan',
                region_name_id: 'in-vc-hp-nachan-version-25-region',
                name_id: 'in-vc-hp-nachan',
              },
              {
                name: 'Seraj',
                region_name_id: 'in-vc-hp-seraj-version-25-region',
                name_id: 'in-vc-hp-seraj',
              },
              {
                name: 'Darang',
                region_name_id: 'in-vc-hp-darang-version-25-region',
                name_id: 'in-vc-hp-darang',
              },
              {
                name: 'Jogindernagar',
                region_name_id: 'in-vc-hp-jogindernagar-version-25-region',
                name_id: 'in-vc-hp-jogindernagar',
              },
              {
                name: 'Mandi',
                region_name_id: 'in-vc-hp-mandi-version-25-region',
                name_id: 'in-vc-hp-mandi',
              },
              {
                name: 'Balh',
                region_name_id: 'in-vc-hp-balh-version-25-region',
                name_id: 'in-vc-hp-balh',
              },
              {
                name: 'Sarkaghat',
                region_name_id: 'in-vc-hp-sarkaghat-version-25-region',
                name_id: 'in-vc-hp-sarkaghat',
              },
            ],
          },
          'in-lc-hp-hamirpur-version-25-region': {
            name: 'Hamirpur',
            region_name_id: 'in-lc-hp-hamirpur-version-25-region',
            name_id: 'in-lc-hp-hamirpur',
            vidhansabha_constituencies: [
              {
                name: 'Dharampur',
                region_name_id: 'in-vc-hp-dharampur-version-25-region',
                name_id: 'in-vc-hp-dharampur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-karsog-version-25-region': {
            name: 'Karsog',
            name_id: 'in-vc-hp-karsog',
            region_name_id: 'in-vc-hp-karsog-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-sundernagar-version-25-region': {
            name: 'Sundernagar',
            name_id: 'in-vc-hp-sundernagar',
            region_name_id: 'in-vc-hp-sundernagar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-nachan-version-25-region': {
            name: 'Nachan',
            name_id: 'in-vc-hp-nachan',
            region_name_id: 'in-vc-hp-nachan-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-seraj-version-25-region': {
            name: 'Seraj',
            name_id: 'in-vc-hp-seraj',
            region_name_id: 'in-vc-hp-seraj-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-darang-version-25-region': {
            name: 'Darang',
            name_id: 'in-vc-hp-darang',
            region_name_id: 'in-vc-hp-darang-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-jogindernagar-version-25-region': {
            name: 'Jogindernagar',
            name_id: 'in-vc-hp-jogindernagar',
            region_name_id: 'in-vc-hp-jogindernagar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-dharampur-version-25-region': {
            name: 'Dharampur',
            name_id: 'in-vc-hp-dharampur',
            region_name_id: 'in-vc-hp-dharampur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-mandi-version-25-region': {
            name: 'Mandi',
            name_id: 'in-vc-hp-mandi',
            region_name_id: 'in-vc-hp-mandi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-balh-version-25-region': {
            name: 'Balh',
            name_id: 'in-vc-hp-balh',
            region_name_id: 'in-vc-hp-balh-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-sarkaghat-version-25-region': {
            name: 'Sarkaghat',
            name_id: 'in-vc-hp-sarkaghat',
            region_name_id: 'in-vc-hp-sarkaghat-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
        },
      },
      'in-d-hp-shimla-version-25-region': {
        name: 'Shimla',
        name_id: 'in-d-hp-shimla',
        region_name_id: 'in-d-hp-shimla-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-mandi-version-25-region': {
            name: 'Mandi',
            region_name_id: 'in-lc-hp-mandi-version-25-region',
            name_id: 'in-lc-hp-mandi',
            vidhansabha_constituencies: [
              {
                name: 'Rampur',
                region_name_id: 'in-vc-hp-rampur-version-25-region',
                name_id: 'in-vc-hp-rampur',
              },
            ],
          },
          'in-lc-hp-shimla-version-25-region': {
            name: 'Shimla',
            region_name_id: 'in-lc-hp-shimla-version-25-region',
            name_id: 'in-lc-hp-shimla',
            vidhansabha_constituencies: [
              {
                name: 'Chopal',
                region_name_id: 'in-vc-hp-chopal-version-25-region',
                name_id: 'in-vc-hp-chopal',
              },
              {
                name: 'Theog',
                region_name_id: 'in-vc-hp-theog-version-25-region',
                name_id: 'in-vc-hp-theog',
              },
              {
                name: 'Kasumpti',
                region_name_id: 'in-vc-hp-kasumpti-version-25-region',
                name_id: 'in-vc-hp-kasumpti',
              },
              {
                name: 'Shimla',
                region_name_id: 'in-vc-hp-shimla-version-25-region',
                name_id: 'in-vc-hp-shimla',
              },
              {
                name: 'Shimla Rural',
                region_name_id: 'in-vc-hp-shimla-rural-version-25-region',
                name_id: 'in-vc-hp-shimla-rural',
              },
              {
                name: 'Jubbal-Kotkhai',
                region_name_id: 'in-vc-hp-jubbal-kotkhai-version-25-region',
                name_id: 'in-vc-hp-jubbal-kotkhai',
              },
              {
                name: 'Rohru',
                region_name_id: 'in-vc-hp-rohru-version-25-region',
                name_id: 'in-vc-hp-rohru',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-chopal-version-25-region': {
            name: 'Chopal',
            name_id: 'in-vc-hp-chopal',
            region_name_id: 'in-vc-hp-chopal-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-theog-version-25-region': {
            name: 'Theog',
            name_id: 'in-vc-hp-theog',
            region_name_id: 'in-vc-hp-theog-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-kasumpti-version-25-region': {
            name: 'Kasumpti',
            name_id: 'in-vc-hp-kasumpti',
            region_name_id: 'in-vc-hp-kasumpti-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-shimla-version-25-region': {
            name: 'Shimla',
            name_id: 'in-vc-hp-shimla',
            region_name_id: 'in-vc-hp-shimla-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-shimla-rural-version-25-region': {
            name: 'Shimla Rural',
            name_id: 'in-vc-hp-shimla-rural',
            region_name_id: 'in-vc-hp-shimla-rural-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-jubbal-kotkhai-version-25-region': {
            name: 'Jubbal-Kotkhai',
            name_id: 'in-vc-hp-jubbal-kotkhai',
            region_name_id: 'in-vc-hp-jubbal-kotkhai-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-rampur-version-25-region': {
            name: 'Rampur',
            name_id: 'in-vc-hp-rampur',
            region_name_id: 'in-vc-hp-rampur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Mandi',
                region_name_id: 'in-lc-hp-mandi-version-25-region',
                name_id: 'in-lc-hp-mandi',
              },
            ],
          },
          'in-vc-hp-rohru-version-25-region': {
            name: 'Rohru',
            name_id: 'in-vc-hp-rohru',
            region_name_id: 'in-vc-hp-rohru-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
        },
      },
      'in-d-hp-sirmaur-version-25-region': {
        name: 'Sirmaur',
        name_id: 'in-d-hp-sirmaur',
        region_name_id: 'in-d-hp-sirmaur-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-shimla-version-25-region': {
            name: 'Shimla',
            region_name_id: 'in-lc-hp-shimla-version-25-region',
            name_id: 'in-lc-hp-shimla',
            vidhansabha_constituencies: [
              {
                name: 'Pachhad',
                region_name_id: 'in-vc-hp-pachhad-version-25-region',
                name_id: 'in-vc-hp-pachhad',
              },
              {
                name: 'Nahan',
                region_name_id: 'in-vc-hp-nahan-version-25-region',
                name_id: 'in-vc-hp-nahan',
              },
              {
                name: 'Sri Renukaji',
                region_name_id: 'in-vc-hp-sri-renukaji-version-25-region',
                name_id: 'in-vc-hp-sri-renukaji',
              },
              {
                name: 'Paonta Sahib',
                region_name_id: 'in-vc-hp-paonta-sahib-version-25-region',
                name_id: 'in-vc-hp-paonta-sahib',
              },
              {
                name: 'Shillai',
                region_name_id: 'in-vc-hp-shillai-version-25-region',
                name_id: 'in-vc-hp-shillai',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-pachhad-version-25-region': {
            name: 'Pachhad',
            name_id: 'in-vc-hp-pachhad',
            region_name_id: 'in-vc-hp-pachhad-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-nahan-version-25-region': {
            name: 'Nahan',
            name_id: 'in-vc-hp-nahan',
            region_name_id: 'in-vc-hp-nahan-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-sri-renukaji-version-25-region': {
            name: 'Sri Renukaji',
            name_id: 'in-vc-hp-sri-renukaji',
            region_name_id: 'in-vc-hp-sri-renukaji-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-paonta-sahib-version-25-region': {
            name: 'Paonta Sahib',
            name_id: 'in-vc-hp-paonta-sahib',
            region_name_id: 'in-vc-hp-paonta-sahib-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-shillai-version-25-region': {
            name: 'Shillai',
            name_id: 'in-vc-hp-shillai',
            region_name_id: 'in-vc-hp-shillai-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
        },
      },
      'in-d-hp-solan-version-25-region': {
        name: 'Solan',
        name_id: 'in-d-hp-solan',
        region_name_id: 'in-d-hp-solan-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-shimla-version-25-region': {
            name: 'Shimla',
            region_name_id: 'in-lc-hp-shimla-version-25-region',
            name_id: 'in-lc-hp-shimla',
            vidhansabha_constituencies: [
              {
                name: 'Arki',
                region_name_id: 'in-vc-hp-arki-version-25-region',
                name_id: 'in-vc-hp-arki',
              },
              {
                name: 'Nalagarh',
                region_name_id: 'in-vc-hp-nalagarh-version-25-region',
                name_id: 'in-vc-hp-nalagarh',
              },
              {
                name: 'Doon',
                region_name_id: 'in-vc-hp-doon-version-25-region',
                name_id: 'in-vc-hp-doon',
              },
              {
                name: 'Solan',
                region_name_id: 'in-vc-hp-solan-version-25-region',
                name_id: 'in-vc-hp-solan',
              },
              {
                name: 'Kasauli',
                region_name_id: 'in-vc-hp-kasauli-version-25-region',
                name_id: 'in-vc-hp-kasauli',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-arki-version-25-region': {
            name: 'Arki',
            name_id: 'in-vc-hp-arki',
            region_name_id: 'in-vc-hp-arki-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-nalagarh-version-25-region': {
            name: 'Nalagarh',
            name_id: 'in-vc-hp-nalagarh',
            region_name_id: 'in-vc-hp-nalagarh-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-doon-version-25-region': {
            name: 'Doon',
            name_id: 'in-vc-hp-doon',
            region_name_id: 'in-vc-hp-doon-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-solan-version-25-region': {
            name: 'Solan',
            name_id: 'in-vc-hp-solan',
            region_name_id: 'in-vc-hp-solan-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
          'in-vc-hp-kasauli-version-25-region': {
            name: 'Kasauli',
            name_id: 'in-vc-hp-kasauli',
            region_name_id: 'in-vc-hp-kasauli-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Shimla',
                region_name_id: 'in-lc-hp-shimla-version-25-region',
                name_id: 'in-lc-hp-shimla',
              },
            ],
          },
        },
      },
      'in-d-hp-una-version-25-region': {
        name: 'Una',
        name_id: 'in-d-hp-una',
        region_name_id: 'in-d-hp-una-version-25-region',
        loksabha_constituencies: {
          'in-lc-hp-hamirpur-version-25-region': {
            name: 'Hamirpur',
            region_name_id: 'in-lc-hp-hamirpur-version-25-region',
            name_id: 'in-lc-hp-hamirpur',
            vidhansabha_constituencies: [
              {
                name: 'Chintpurni',
                region_name_id: 'in-vc-hp-chintpurni-version-25-region',
                name_id: 'in-vc-hp-chintpurni',
              },
              {
                name: 'Gagret',
                region_name_id: 'in-vc-hp-gagret-version-25-region',
                name_id: 'in-vc-hp-gagret',
              },
              {
                name: 'Haroli',
                region_name_id: 'in-vc-hp-haroli-version-25-region',
                name_id: 'in-vc-hp-haroli',
              },
              {
                name: 'Una',
                region_name_id: 'in-vc-hp-una-version-25-region',
                name_id: 'in-vc-hp-una',
              },
              {
                name: 'Kutlehar',
                region_name_id: 'in-vc-hp-kutlehar-version-25-region',
                name_id: 'in-vc-hp-kutlehar',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-hp-chintpurni-version-25-region': {
            name: 'Chintpurni',
            name_id: 'in-vc-hp-chintpurni',
            region_name_id: 'in-vc-hp-chintpurni-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-gagret-version-25-region': {
            name: 'Gagret',
            name_id: 'in-vc-hp-gagret',
            region_name_id: 'in-vc-hp-gagret-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-haroli-version-25-region': {
            name: 'Haroli',
            name_id: 'in-vc-hp-haroli',
            region_name_id: 'in-vc-hp-haroli-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-una-version-25-region': {
            name: 'Una',
            name_id: 'in-vc-hp-una',
            region_name_id: 'in-vc-hp-una-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
          'in-vc-hp-kutlehar-version-25-region': {
            name: 'Kutlehar',
            name_id: 'in-vc-hp-kutlehar',
            region_name_id: 'in-vc-hp-kutlehar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hamirpur',
                region_name_id: 'in-lc-hp-hamirpur-version-25-region',
                name_id: 'in-lc-hp-hamirpur',
              },
            ],
          },
        },
      },
    },
  },
  'in-sut-punjab-version-25-region': {
    name: 'Punjab',
    name_id: 'in-sut-punjab',
    region_name_id: 'in-sut-punjab-version-25-region',
    districts: {
      'in-d-pb-amritsar-version-25-region': {
        name: 'Amritsar',
        name_id: 'in-d-pb-amritsar',
        region_name_id: 'in-d-pb-amritsar-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-amritsar-version-25-region': {
            name: 'Amritsar',
            region_name_id: 'in-lc-pb-amritsar-version-25-region',
            name_id: 'in-lc-pb-amritsar',
            vidhansabha_constituencies: [
              {
                name: 'Ajnala',
                region_name_id: 'in-vc-pb-ajnala-version-25-region',
                name_id: 'in-vc-pb-ajnala',
              },
              {
                name: 'Raja Sansi',
                region_name_id: 'in-vc-pb-raja-sansi-version-25-region',
                name_id: 'in-vc-pb-raja-sansi',
              },
              {
                name: 'Majitha',
                region_name_id: 'in-vc-pb-majitha-version-25-region',
                name_id: 'in-vc-pb-majitha',
              },
              {
                name: 'Amritsar North',
                region_name_id: 'in-vc-pb-amritsar-north-version-25-region',
                name_id: 'in-vc-pb-amritsar-north',
              },
              {
                name: 'Amritsar West',
                region_name_id: 'in-vc-pb-amritsar-west-version-25-region',
                name_id: 'in-vc-pb-amritsar-west',
              },
              {
                name: 'Amritsar Central',
                region_name_id: 'in-vc-pb-amritsar-central-version-25-region',
                name_id: 'in-vc-pb-amritsar-central',
              },
              {
                name: 'Amritsar East',
                region_name_id: 'in-vc-pb-amritsar-east-version-25-region',
                name_id: 'in-vc-pb-amritsar-east',
              },
              {
                name: 'Amritsar South',
                region_name_id: 'in-vc-pb-amritsar-south-version-25-region',
                name_id: 'in-vc-pb-amritsar-south',
              },
              {
                name: 'Attari',
                region_name_id: 'in-vc-pb-attari-version-25-region',
                name_id: 'in-vc-pb-attari',
              },
            ],
          },
          'in-lc-pb-khadoor-sahib-version-25-region': {
            name: 'Khadoor Sahib',
            region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
            name_id: 'in-lc-pb-khadoor-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Jandiala',
                region_name_id: 'in-vc-pb-jandiala-version-25-region',
                name_id: 'in-vc-pb-jandiala',
              },
              {
                name: 'Baba Bakala',
                region_name_id: 'in-vc-pb-baba-bakala-version-25-region',
                name_id: 'in-vc-pb-baba-bakala',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-ajnala-version-25-region': {
            name: 'Ajnala',
            name_id: 'in-vc-pb-ajnala',
            region_name_id: 'in-vc-pb-ajnala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-raja-sansi-version-25-region': {
            name: 'Raja Sansi',
            name_id: 'in-vc-pb-raja-sansi',
            region_name_id: 'in-vc-pb-raja-sansi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-majitha-version-25-region': {
            name: 'Majitha',
            name_id: 'in-vc-pb-majitha',
            region_name_id: 'in-vc-pb-majitha-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-jandiala-version-25-region': {
            name: 'Jandiala',
            name_id: 'in-vc-pb-jandiala',
            region_name_id: 'in-vc-pb-jandiala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-amritsar-north-version-25-region': {
            name: 'Amritsar North',
            name_id: 'in-vc-pb-amritsar-north',
            region_name_id: 'in-vc-pb-amritsar-north-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-amritsar-west-version-25-region': {
            name: 'Amritsar West',
            name_id: 'in-vc-pb-amritsar-west',
            region_name_id: 'in-vc-pb-amritsar-west-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-amritsar-central-version-25-region': {
            name: 'Amritsar Central',
            name_id: 'in-vc-pb-amritsar-central',
            region_name_id: 'in-vc-pb-amritsar-central-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-amritsar-east-version-25-region': {
            name: 'Amritsar East',
            name_id: 'in-vc-pb-amritsar-east',
            region_name_id: 'in-vc-pb-amritsar-east-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-amritsar-south-version-25-region': {
            name: 'Amritsar South',
            name_id: 'in-vc-pb-amritsar-south',
            region_name_id: 'in-vc-pb-amritsar-south-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-attari-version-25-region': {
            name: 'Attari',
            name_id: 'in-vc-pb-attari',
            region_name_id: 'in-vc-pb-attari-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Amritsar',
                region_name_id: 'in-lc-pb-amritsar-version-25-region',
                name_id: 'in-lc-pb-amritsar',
              },
            ],
          },
          'in-vc-pb-baba-bakala-version-25-region': {
            name: 'Baba Bakala',
            name_id: 'in-vc-pb-baba-bakala',
            region_name_id: 'in-vc-pb-baba-bakala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
        },
      },
      'in-d-pb-barnala-version-25-region': {
        name: 'Barnala',
        name_id: 'in-d-pb-barnala',
        region_name_id: 'in-d-pb-barnala-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-sangrur-version-25-region': {
            name: 'Sangrur',
            region_name_id: 'in-lc-pb-sangrur-version-25-region',
            name_id: 'in-lc-pb-sangrur',
            vidhansabha_constituencies: [
              {
                name: 'Bhadaur',
                region_name_id: 'in-vc-pb-bhadaur-version-25-region',
                name_id: 'in-vc-pb-bhadaur',
              },
              {
                name: 'Barnala',
                region_name_id: 'in-vc-pb-barnala-version-25-region',
                name_id: 'in-vc-pb-barnala',
              },
              {
                name: 'Mehal Kalan',
                region_name_id: 'in-vc-pb-mehal-kalan-version-25-region',
                name_id: 'in-vc-pb-mehal-kalan',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-bhadaur-version-25-region': {
            name: 'Bhadaur',
            name_id: 'in-vc-pb-bhadaur',
            region_name_id: 'in-vc-pb-bhadaur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-barnala-version-25-region': {
            name: 'Barnala',
            name_id: 'in-vc-pb-barnala',
            region_name_id: 'in-vc-pb-barnala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-mehal-kalan-version-25-region': {
            name: 'Mehal Kalan',
            name_id: 'in-vc-pb-mehal-kalan',
            region_name_id: 'in-vc-pb-mehal-kalan-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
        },
      },
      'in-d-pb-bathinda-version-25-region': {
        name: 'Bathinda',
        name_id: 'in-d-pb-bathinda',
        region_name_id: 'in-d-pb-bathinda-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-faridkot-version-25-region': {
            name: 'Faridkot',
            region_name_id: 'in-lc-pb-faridkot-version-25-region',
            name_id: 'in-lc-pb-faridkot',
            vidhansabha_constituencies: [
              {
                name: 'Rampura Phul',
                region_name_id: 'in-vc-pb-rampura-phul-version-25-region',
                name_id: 'in-vc-pb-rampura-phul',
              },
            ],
          },
          'in-lc-pb-bathinda-version-25-region': {
            name: 'Bathinda',
            region_name_id: 'in-lc-pb-bathinda-version-25-region',
            name_id: 'in-lc-pb-bathinda',
            vidhansabha_constituencies: [
              {
                name: 'Bhucho Mandi',
                region_name_id: 'in-vc-pb-bhucho-mandi-version-25-region',
                name_id: 'in-vc-pb-bhucho-mandi',
              },
              {
                name: 'Bathinda Urban',
                region_name_id: 'in-vc-pb-bathinda-urban-version-25-region',
                name_id: 'in-vc-pb-bathinda-urban',
              },
              {
                name: 'Bathinda Rural',
                region_name_id: 'in-vc-pb-bathinda-rural-version-25-region',
                name_id: 'in-vc-pb-bathinda-rural',
              },
              {
                name: 'Talwandi Sabo',
                region_name_id: 'in-vc-pb-talwandi-sabo-version-25-region',
                name_id: 'in-vc-pb-talwandi-sabo',
              },
              {
                name: 'Maur',
                region_name_id: 'in-vc-pb-maur-version-25-region',
                name_id: 'in-vc-pb-maur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-rampura-phul-version-25-region': {
            name: 'Rampura Phul',
            name_id: 'in-vc-pb-rampura-phul',
            region_name_id: 'in-vc-pb-rampura-phul-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
          'in-vc-pb-bhucho-mandi-version-25-region': {
            name: 'Bhucho Mandi',
            name_id: 'in-vc-pb-bhucho-mandi',
            region_name_id: 'in-vc-pb-bhucho-mandi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
          'in-vc-pb-bathinda-urban-version-25-region': {
            name: 'Bathinda Urban',
            name_id: 'in-vc-pb-bathinda-urban',
            region_name_id: 'in-vc-pb-bathinda-urban-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
          'in-vc-pb-bathinda-rural-version-25-region': {
            name: 'Bathinda Rural',
            name_id: 'in-vc-pb-bathinda-rural',
            region_name_id: 'in-vc-pb-bathinda-rural-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
          'in-vc-pb-talwandi-sabo-version-25-region': {
            name: 'Talwandi Sabo',
            name_id: 'in-vc-pb-talwandi-sabo',
            region_name_id: 'in-vc-pb-talwandi-sabo-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
          'in-vc-pb-maur-version-25-region': {
            name: 'Maur',
            name_id: 'in-vc-pb-maur',
            region_name_id: 'in-vc-pb-maur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
        },
      },
      'in-d-pb-firozpur-version-25-region': {
        name: 'Firozpur',
        name_id: 'in-d-pb-firozpur',
        region_name_id: 'in-d-pb-firozpur-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-khadoor-sahib-version-25-region': {
            name: 'Khadoor Sahib',
            region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
            name_id: 'in-lc-pb-khadoor-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Zira',
                region_name_id: 'in-vc-pb-zira-version-25-region',
                name_id: 'in-vc-pb-zira',
              },
            ],
          },
          'in-lc-pb-firozpur-version-25-region': {
            name: 'Firozpur',
            region_name_id: 'in-lc-pb-firozpur-version-25-region',
            name_id: 'in-lc-pb-firozpur',
            vidhansabha_constituencies: [
              {
                name: 'Firozpur City',
                region_name_id: 'in-vc-pb-firozpur-city-version-25-region',
                name_id: 'in-vc-pb-firozpur-city',
              },
              {
                name: 'Firozpur Rural',
                region_name_id: 'in-vc-pb-firozpur-rural-version-25-region',
                name_id: 'in-vc-pb-firozpur-rural',
              },
              {
                name: 'Guru Har Sahai',
                region_name_id: 'in-vc-pb-guru-har-sahai-version-25-region',
                name_id: 'in-vc-pb-guru-har-sahai',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-zira-version-25-region': {
            name: 'Zira',
            name_id: 'in-vc-pb-zira',
            region_name_id: 'in-vc-pb-zira-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-firozpur-city-version-25-region': {
            name: 'Firozpur City',
            name_id: 'in-vc-pb-firozpur-city',
            region_name_id: 'in-vc-pb-firozpur-city-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
          'in-vc-pb-firozpur-rural-version-25-region': {
            name: 'Firozpur Rural',
            name_id: 'in-vc-pb-firozpur-rural',
            region_name_id: 'in-vc-pb-firozpur-rural-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
          'in-vc-pb-guru-har-sahai-version-25-region': {
            name: 'Guru Har Sahai',
            name_id: 'in-vc-pb-guru-har-sahai',
            region_name_id: 'in-vc-pb-guru-har-sahai-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
        },
      },
      'in-d-pb-faridkot-version-25-region': {
        name: 'Faridkot',
        name_id: 'in-d-pb-faridkot',
        region_name_id: 'in-d-pb-faridkot-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-faridkot-version-25-region': {
            name: 'Faridkot',
            region_name_id: 'in-lc-pb-faridkot-version-25-region',
            name_id: 'in-lc-pb-faridkot',
            vidhansabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-vc-pb-faridkot-version-25-region',
                name_id: 'in-vc-pb-faridkot',
              },
              {
                name: 'Kotkapura',
                region_name_id: 'in-vc-pb-kotkapura-version-25-region',
                name_id: 'in-vc-pb-kotkapura',
              },
              {
                name: 'Jaitu',
                region_name_id: 'in-vc-pb-jaitu-version-25-region',
                name_id: 'in-vc-pb-jaitu',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-faridkot-version-25-region': {
            name: 'Faridkot',
            name_id: 'in-vc-pb-faridkot',
            region_name_id: 'in-vc-pb-faridkot-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
          'in-vc-pb-kotkapura-version-25-region': {
            name: 'Kotkapura',
            name_id: 'in-vc-pb-kotkapura',
            region_name_id: 'in-vc-pb-kotkapura-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
          'in-vc-pb-jaitu-version-25-region': {
            name: 'Jaitu',
            name_id: 'in-vc-pb-jaitu',
            region_name_id: 'in-vc-pb-jaitu-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
        },
      },
      'in-d-pb-fatehgarh-sahib-version-25-region': {
        name: 'Fatehgarh Sahib',
        name_id: 'in-d-pb-fatehgarh-sahib',
        region_name_id: 'in-d-pb-fatehgarh-sahib-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-fatehgarh-sahib-version-25-region': {
            name: 'Fatehgarh Sahib',
            region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
            name_id: 'in-lc-pb-fatehgarh-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Bassi Pathana',
                region_name_id: 'in-vc-pb-bassi-pathana-version-25-region',
                name_id: 'in-vc-pb-bassi-pathana',
              },
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-vc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-vc-pb-fatehgarh-sahib',
              },
              {
                name: 'Amloh',
                region_name_id: 'in-vc-pb-amloh-version-25-region',
                name_id: 'in-vc-pb-amloh',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-bassi-pathana-version-25-region': {
            name: 'Bassi Pathana',
            name_id: 'in-vc-pb-bassi-pathana',
            region_name_id: 'in-vc-pb-bassi-pathana-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
          'in-vc-pb-fatehgarh-sahib-version-25-region': {
            name: 'Fatehgarh Sahib',
            name_id: 'in-vc-pb-fatehgarh-sahib',
            region_name_id: 'in-vc-pb-fatehgarh-sahib-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
          'in-vc-pb-amloh-version-25-region': {
            name: 'Amloh',
            name_id: 'in-vc-pb-amloh',
            region_name_id: 'in-vc-pb-amloh-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
        },
      },
      'in-d-pb-fazilka-version-25-region': {
        name: 'Fazilka',
        name_id: 'in-d-pb-fazilka',
        region_name_id: 'in-d-pb-fazilka-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-firozpur-version-25-region': {
            name: 'Firozpur',
            region_name_id: 'in-lc-pb-firozpur-version-25-region',
            name_id: 'in-lc-pb-firozpur',
            vidhansabha_constituencies: [
              {
                name: 'Guru Har Sahai',
                region_name_id: 'in-vc-pb-guru-har-sahai-version-25-region',
                name_id: 'in-vc-pb-guru-har-sahai',
              },
              {
                name: 'Jalalabad',
                region_name_id: 'in-vc-pb-jalalabad-version-25-region',
                name_id: 'in-vc-pb-jalalabad',
              },
              {
                name: 'Fazilka',
                region_name_id: 'in-vc-pb-fazilka-version-25-region',
                name_id: 'in-vc-pb-fazilka',
              },
              {
                name: 'Abohar',
                region_name_id: 'in-vc-pb-abohar-version-25-region',
                name_id: 'in-vc-pb-abohar',
              },
              {
                name: 'Balluana',
                region_name_id: 'in-vc-pb-balluana-version-25-region',
                name_id: 'in-vc-pb-balluana',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-guru-har-sahai-version-25-region': {
            name: 'Guru Har Sahai',
            name_id: 'in-vc-pb-guru-har-sahai',
            region_name_id: 'in-vc-pb-guru-har-sahai-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
          'in-vc-pb-jalalabad-version-25-region': {
            name: 'Jalalabad',
            name_id: 'in-vc-pb-jalalabad',
            region_name_id: 'in-vc-pb-jalalabad-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
          'in-vc-pb-fazilka-version-25-region': {
            name: 'Fazilka',
            name_id: 'in-vc-pb-fazilka',
            region_name_id: 'in-vc-pb-fazilka-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
          'in-vc-pb-abohar-version-25-region': {
            name: 'Abohar',
            name_id: 'in-vc-pb-abohar',
            region_name_id: 'in-vc-pb-abohar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
          'in-vc-pb-balluana-version-25-region': {
            name: 'Balluana',
            name_id: 'in-vc-pb-balluana',
            region_name_id: 'in-vc-pb-balluana-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
        },
      },
      'in-d-pb-gurdaspur-version-25-region': {
        name: 'Gurdaspur',
        name_id: 'in-d-pb-gurdaspur',
        region_name_id: 'in-d-pb-gurdaspur-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-gurdaspur-version-25-region': {
            name: 'Gurdaspur',
            region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
            name_id: 'in-lc-pb-gurdaspur',
            vidhansabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-vc-pb-gurdaspur-version-25-region',
                name_id: 'in-vc-pb-gurdaspur',
              },
              {
                name: 'Dina Nagar',
                region_name_id: 'in-vc-pb-dina-nagar-version-25-region',
                name_id: 'in-vc-pb-dina-nagar',
              },
              {
                name: 'Qadian',
                region_name_id: 'in-vc-pb-qadian-version-25-region',
                name_id: 'in-vc-pb-qadian',
              },
              {
                name: 'Batala',
                region_name_id: 'in-vc-pb-batala-version-25-region',
                name_id: 'in-vc-pb-batala',
              },
              {
                name: 'Fatehgarh Churian',
                region_name_id: 'in-vc-pb-fatehgarh-churian-version-25-region',
                name_id: 'in-vc-pb-fatehgarh-churian',
              },
              {
                name: 'Dera Baba Nanak',
                region_name_id: 'in-vc-pb-dera-baba-nanak-version-25-region',
                name_id: 'in-vc-pb-dera-baba-nanak',
              },
            ],
          },
          'in-lc-pb-hoshiarpur-version-25-region': {
            name: 'Hoshiarpur',
            region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
            name_id: 'in-lc-pb-hoshiarpur',
            vidhansabha_constituencies: [
              {
                name: 'Sri Hargobindpur',
                region_name_id: 'in-vc-pb-sri-hargobindpur-version-25-region',
                name_id: 'in-vc-pb-sri-hargobindpur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-gurdaspur-version-25-region': {
            name: 'Gurdaspur',
            name_id: 'in-vc-pb-gurdaspur',
            region_name_id: 'in-vc-pb-gurdaspur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
          'in-vc-pb-dina-nagar-version-25-region': {
            name: 'Dina Nagar',
            name_id: 'in-vc-pb-dina-nagar',
            region_name_id: 'in-vc-pb-dina-nagar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
          'in-vc-pb-qadian-version-25-region': {
            name: 'Qadian',
            name_id: 'in-vc-pb-qadian',
            region_name_id: 'in-vc-pb-qadian-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
          'in-vc-pb-batala-version-25-region': {
            name: 'Batala',
            name_id: 'in-vc-pb-batala',
            region_name_id: 'in-vc-pb-batala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
          'in-vc-pb-sri-hargobindpur-version-25-region': {
            name: 'Sri Hargobindpur',
            name_id: 'in-vc-pb-sri-hargobindpur',
            region_name_id: 'in-vc-pb-sri-hargobindpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-fatehgarh-churian-version-25-region': {
            name: 'Fatehgarh Churian',
            name_id: 'in-vc-pb-fatehgarh-churian',
            region_name_id: 'in-vc-pb-fatehgarh-churian-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
          'in-vc-pb-dera-baba-nanak-version-25-region': {
            name: 'Dera Baba Nanak',
            name_id: 'in-vc-pb-dera-baba-nanak',
            region_name_id: 'in-vc-pb-dera-baba-nanak-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
        },
      },
      'in-d-pb-hoshiarpur-version-25-region': {
        name: 'Hoshiarpur',
        name_id: 'in-d-pb-hoshiarpur',
        region_name_id: 'in-d-pb-hoshiarpur-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-hoshiarpur-version-25-region': {
            name: 'Hoshiarpur',
            region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
            name_id: 'in-lc-pb-hoshiarpur',
            vidhansabha_constituencies: [
              {
                name: 'Mukerian',
                region_name_id: 'in-vc-pb-mukerian-version-25-region',
                name_id: 'in-vc-pb-mukerian',
              },
              {
                name: 'Dasuya',
                region_name_id: 'in-vc-pb-dasuya-version-25-region',
                name_id: 'in-vc-pb-dasuya',
              },
              {
                name: 'Urmar',
                region_name_id: 'in-vc-pb-urmar-version-25-region',
                name_id: 'in-vc-pb-urmar',
              },
              {
                name: 'Sham Chaurasi',
                region_name_id: 'in-vc-pb-sham-chaurasi-version-25-region',
                name_id: 'in-vc-pb-sham-chaurasi',
              },
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-vc-pb-hoshiarpur-version-25-region',
                name_id: 'in-vc-pb-hoshiarpur',
              },
              {
                name: 'Chabbewal',
                region_name_id: 'in-vc-pb-chabbewal-version-25-region',
                name_id: 'in-vc-pb-chabbewal',
              },
            ],
          },
          'in-lc-pb-anandpur-sahib-version-25-region': {
            name: 'Anandpur Sahib',
            region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
            name_id: 'in-lc-pb-anandpur-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Garhshankar',
                region_name_id: 'in-vc-pb-garhshankar-version-25-region',
                name_id: 'in-vc-pb-garhshankar',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-mukerian-version-25-region': {
            name: 'Mukerian',
            name_id: 'in-vc-pb-mukerian',
            region_name_id: 'in-vc-pb-mukerian-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-dasuya-version-25-region': {
            name: 'Dasuya',
            name_id: 'in-vc-pb-dasuya',
            region_name_id: 'in-vc-pb-dasuya-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-urmar-version-25-region': {
            name: 'Urmar',
            name_id: 'in-vc-pb-urmar',
            region_name_id: 'in-vc-pb-urmar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-sham-chaurasi-version-25-region': {
            name: 'Sham Chaurasi',
            name_id: 'in-vc-pb-sham-chaurasi',
            region_name_id: 'in-vc-pb-sham-chaurasi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-hoshiarpur-version-25-region': {
            name: 'Hoshiarpur',
            name_id: 'in-vc-pb-hoshiarpur',
            region_name_id: 'in-vc-pb-hoshiarpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-chabbewal-version-25-region': {
            name: 'Chabbewal',
            name_id: 'in-vc-pb-chabbewal',
            region_name_id: 'in-vc-pb-chabbewal-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-garhshankar-version-25-region': {
            name: 'Garhshankar',
            name_id: 'in-vc-pb-garhshankar',
            region_name_id: 'in-vc-pb-garhshankar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
        },
      },
      'in-d-pb-jalandhar-version-25-region': {
        name: 'Jalandhar',
        name_id: 'in-d-pb-jalandhar',
        region_name_id: 'in-d-pb-jalandhar-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-jalandhar-version-25-region': {
            name: 'Jalandhar',
            region_name_id: 'in-lc-pb-jalandhar-version-25-region',
            name_id: 'in-lc-pb-jalandhar',
            vidhansabha_constituencies: [
              {
                name: 'Phillaur',
                region_name_id: 'in-vc-pb-phillaur-version-25-region',
                name_id: 'in-vc-pb-phillaur',
              },
              {
                name: 'Nakodar',
                region_name_id: 'in-vc-pb-nakodar-version-25-region',
                name_id: 'in-vc-pb-nakodar',
              },
              {
                name: 'Shahkot',
                region_name_id: 'in-vc-pb-shahkot-version-25-region',
                name_id: 'in-vc-pb-shahkot',
              },
              {
                name: 'Kartarpur',
                region_name_id: 'in-vc-pb-kartarpur-version-25-region',
                name_id: 'in-vc-pb-kartarpur',
              },
              {
                name: 'Jalandhar West',
                region_name_id: 'in-vc-pb-jalandhar-west-version-25-region',
                name_id: 'in-vc-pb-jalandhar-west',
              },
              {
                name: 'Jalandhar Central',
                region_name_id: 'in-vc-pb-jalandhar-central-version-25-region',
                name_id: 'in-vc-pb-jalandhar-central',
              },
              {
                name: 'Jalandhar North',
                region_name_id: 'in-vc-pb-jalandhar-north-version-25-region',
                name_id: 'in-vc-pb-jalandhar-north',
              },
              {
                name: 'Jalandhar Cantt',
                region_name_id: 'in-vc-pb-jalandhar-cantt-version-25-region',
                name_id: 'in-vc-pb-jalandhar-cantt',
              },
              {
                name: 'Adampur',
                region_name_id: 'in-vc-pb-adampur-version-25-region',
                name_id: 'in-vc-pb-adampur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-phillaur-version-25-region': {
            name: 'Phillaur',
            name_id: 'in-vc-pb-phillaur',
            region_name_id: 'in-vc-pb-phillaur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-nakodar-version-25-region': {
            name: 'Nakodar',
            name_id: 'in-vc-pb-nakodar',
            region_name_id: 'in-vc-pb-nakodar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-shahkot-version-25-region': {
            name: 'Shahkot',
            name_id: 'in-vc-pb-shahkot',
            region_name_id: 'in-vc-pb-shahkot-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-kartarpur-version-25-region': {
            name: 'Kartarpur',
            name_id: 'in-vc-pb-kartarpur',
            region_name_id: 'in-vc-pb-kartarpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-jalandhar-west-version-25-region': {
            name: 'Jalandhar West',
            name_id: 'in-vc-pb-jalandhar-west',
            region_name_id: 'in-vc-pb-jalandhar-west-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-jalandhar-central-version-25-region': {
            name: 'Jalandhar Central',
            name_id: 'in-vc-pb-jalandhar-central',
            region_name_id: 'in-vc-pb-jalandhar-central-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-jalandhar-north-version-25-region': {
            name: 'Jalandhar North',
            name_id: 'in-vc-pb-jalandhar-north',
            region_name_id: 'in-vc-pb-jalandhar-north-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-jalandhar-cantt-version-25-region': {
            name: 'Jalandhar Cantt',
            name_id: 'in-vc-pb-jalandhar-cantt',
            region_name_id: 'in-vc-pb-jalandhar-cantt-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
          'in-vc-pb-adampur-version-25-region': {
            name: 'Adampur',
            name_id: 'in-vc-pb-adampur',
            region_name_id: 'in-vc-pb-adampur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Jalandhar',
                region_name_id: 'in-lc-pb-jalandhar-version-25-region',
                name_id: 'in-lc-pb-jalandhar',
              },
            ],
          },
        },
      },
      'in-d-pb-kapurthala-version-25-region': {
        name: 'Kapurthala',
        name_id: 'in-d-pb-kapurthala',
        region_name_id: 'in-d-pb-kapurthala-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-khadoor-sahib-version-25-region': {
            name: 'Khadoor Sahib',
            region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
            name_id: 'in-lc-pb-khadoor-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Kapurthala',
                region_name_id: 'in-vc-pb-kapurthala-version-25-region',
                name_id: 'in-vc-pb-kapurthala',
              },
              {
                name: 'Sultanpur Lodhi',
                region_name_id: 'in-vc-pb-sultanpur-lodhi-version-25-region',
                name_id: 'in-vc-pb-sultanpur-lodhi',
              },
            ],
          },
          'in-lc-pb-hoshiarpur-version-25-region': {
            name: 'Hoshiarpur',
            region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
            name_id: 'in-lc-pb-hoshiarpur',
            vidhansabha_constituencies: [
              {
                name: 'Bholath',
                region_name_id: 'in-vc-pb-bholath-version-25-region',
                name_id: 'in-vc-pb-bholath',
              },
              {
                name: 'Phagwara',
                region_name_id: 'in-vc-pb-phagwara-version-25-region',
                name_id: 'in-vc-pb-phagwara',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-bholath-version-25-region': {
            name: 'Bholath',
            name_id: 'in-vc-pb-bholath',
            region_name_id: 'in-vc-pb-bholath-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
          'in-vc-pb-kapurthala-version-25-region': {
            name: 'Kapurthala',
            name_id: 'in-vc-pb-kapurthala',
            region_name_id: 'in-vc-pb-kapurthala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-sultanpur-lodhi-version-25-region': {
            name: 'Sultanpur Lodhi',
            name_id: 'in-vc-pb-sultanpur-lodhi',
            region_name_id: 'in-vc-pb-sultanpur-lodhi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-phagwara-version-25-region': {
            name: 'Phagwara',
            name_id: 'in-vc-pb-phagwara',
            region_name_id: 'in-vc-pb-phagwara-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Hoshiarpur',
                region_name_id: 'in-lc-pb-hoshiarpur-version-25-region',
                name_id: 'in-lc-pb-hoshiarpur',
              },
            ],
          },
        },
      },
      'in-d-pb-ludhiana-version-25-region': {
        name: 'Ludhiana',
        name_id: 'in-d-pb-ludhiana',
        region_name_id: 'in-d-pb-ludhiana-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-ludhiana-version-25-region': {
            name: 'Ludhiana',
            region_name_id: 'in-lc-pb-ludhiana-version-25-region',
            name_id: 'in-lc-pb-ludhiana',
            vidhansabha_constituencies: [
              {
                name: 'Ludhiana East',
                region_name_id: 'in-vc-pb-ludhiana-east-version-25-region',
                name_id: 'in-vc-pb-ludhiana-east',
              },
              {
                name: 'Ludhiana South',
                region_name_id: 'in-vc-pb-ludhiana-south-version-25-region',
                name_id: 'in-vc-pb-ludhiana-south',
              },
              {
                name: 'Atam Nagar',
                region_name_id: 'in-vc-pb-atam-nagar-version-25-region',
                name_id: 'in-vc-pb-atam-nagar',
              },
              {
                name: 'Ludhiana Central',
                region_name_id: 'in-vc-pb-ludhiana-central-version-25-region',
                name_id: 'in-vc-pb-ludhiana-central',
              },
              {
                name: 'Ludhiana West',
                region_name_id: 'in-vc-pb-ludhiana-west-version-25-region',
                name_id: 'in-vc-pb-ludhiana-west',
              },
              {
                name: 'Ludhiana North',
                region_name_id: 'in-vc-pb-ludhiana-north-version-25-region',
                name_id: 'in-vc-pb-ludhiana-north',
              },
              {
                name: 'Gill',
                region_name_id: 'in-vc-pb-gill-version-25-region',
                name_id: 'in-vc-pb-gill',
              },
              {
                name: 'Dakha',
                region_name_id: 'in-vc-pb-dakha-version-25-region',
                name_id: 'in-vc-pb-dakha',
              },
              {
                name: 'Jagraon',
                region_name_id: 'in-vc-pb-jagraon-version-25-region',
                name_id: 'in-vc-pb-jagraon',
              },
            ],
          },
          'in-lc-pb-fatehgarh-sahib-version-25-region': {
            name: 'Fatehgarh Sahib',
            region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
            name_id: 'in-lc-pb-fatehgarh-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Khanna',
                region_name_id: 'in-vc-pb-khanna-version-25-region',
                name_id: 'in-vc-pb-khanna',
              },
              {
                name: 'Samrala',
                region_name_id: 'in-vc-pb-samrala-version-25-region',
                name_id: 'in-vc-pb-samrala',
              },
              {
                name: 'Sahnewal',
                region_name_id: 'in-vc-pb-sahnewal-version-25-region',
                name_id: 'in-vc-pb-sahnewal',
              },
              {
                name: 'Payal',
                region_name_id: 'in-vc-pb-payal-version-25-region',
                name_id: 'in-vc-pb-payal',
              },
              {
                name: 'Raikot',
                region_name_id: 'in-vc-pb-raikot-version-25-region',
                name_id: 'in-vc-pb-raikot',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-khanna-version-25-region': {
            name: 'Khanna',
            name_id: 'in-vc-pb-khanna',
            region_name_id: 'in-vc-pb-khanna-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
          'in-vc-pb-samrala-version-25-region': {
            name: 'Samrala',
            name_id: 'in-vc-pb-samrala',
            region_name_id: 'in-vc-pb-samrala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
          'in-vc-pb-sahnewal-version-25-region': {
            name: 'Sahnewal',
            name_id: 'in-vc-pb-sahnewal',
            region_name_id: 'in-vc-pb-sahnewal-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
          'in-vc-pb-ludhiana-east-version-25-region': {
            name: 'Ludhiana East',
            name_id: 'in-vc-pb-ludhiana-east',
            region_name_id: 'in-vc-pb-ludhiana-east-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-ludhiana-south-version-25-region': {
            name: 'Ludhiana South',
            name_id: 'in-vc-pb-ludhiana-south',
            region_name_id: 'in-vc-pb-ludhiana-south-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-atam-nagar-version-25-region': {
            name: 'Atam Nagar',
            name_id: 'in-vc-pb-atam-nagar',
            region_name_id: 'in-vc-pb-atam-nagar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-ludhiana-central-version-25-region': {
            name: 'Ludhiana Central',
            name_id: 'in-vc-pb-ludhiana-central',
            region_name_id: 'in-vc-pb-ludhiana-central-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-ludhiana-west-version-25-region': {
            name: 'Ludhiana West',
            name_id: 'in-vc-pb-ludhiana-west',
            region_name_id: 'in-vc-pb-ludhiana-west-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-ludhiana-north-version-25-region': {
            name: 'Ludhiana North',
            name_id: 'in-vc-pb-ludhiana-north',
            region_name_id: 'in-vc-pb-ludhiana-north-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-gill-version-25-region': {
            name: 'Gill',
            name_id: 'in-vc-pb-gill',
            region_name_id: 'in-vc-pb-gill-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-payal-version-25-region': {
            name: 'Payal',
            name_id: 'in-vc-pb-payal',
            region_name_id: 'in-vc-pb-payal-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
          'in-vc-pb-dakha-version-25-region': {
            name: 'Dakha',
            name_id: 'in-vc-pb-dakha',
            region_name_id: 'in-vc-pb-dakha-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
          'in-vc-pb-raikot-version-25-region': {
            name: 'Raikot',
            name_id: 'in-vc-pb-raikot',
            region_name_id: 'in-vc-pb-raikot-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
          'in-vc-pb-jagraon-version-25-region': {
            name: 'Jagraon',
            name_id: 'in-vc-pb-jagraon',
            region_name_id: 'in-vc-pb-jagraon-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Ludhiana',
                region_name_id: 'in-lc-pb-ludhiana-version-25-region',
                name_id: 'in-lc-pb-ludhiana',
              },
            ],
          },
        },
      },
      'in-d-pb-malerkotla-version-25-region': {
        name: 'Malerkotla',
        name_id: 'in-d-pb-malerkotla',
        region_name_id: 'in-d-pb-malerkotla-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-fatehgarh-sahib-version-25-region': {
            name: 'Fatehgarh Sahib',
            region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
            name_id: 'in-lc-pb-fatehgarh-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Amargarh',
                region_name_id: 'in-vc-pb-amargarh-version-25-region',
                name_id: 'in-vc-pb-amargarh',
              },
            ],
          },
          'in-lc-pb-sangrur-version-25-region': {
            name: 'Sangrur',
            region_name_id: 'in-lc-pb-sangrur-version-25-region',
            name_id: 'in-lc-pb-sangrur',
            vidhansabha_constituencies: [
              {
                name: 'Malerkotla',
                region_name_id: 'in-vc-pb-malerkotla-version-25-region',
                name_id: 'in-vc-pb-malerkotla',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-malerkotla-version-25-region': {
            name: 'Malerkotla',
            name_id: 'in-vc-pb-malerkotla',
            region_name_id: 'in-vc-pb-malerkotla-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-amargarh-version-25-region': {
            name: 'Amargarh',
            name_id: 'in-vc-pb-amargarh',
            region_name_id: 'in-vc-pb-amargarh-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Fatehgarh Sahib',
                region_name_id: 'in-lc-pb-fatehgarh-sahib-version-25-region',
                name_id: 'in-lc-pb-fatehgarh-sahib',
              },
            ],
          },
        },
      },
      'in-d-pb-mansa-version-25-region': {
        name: 'Mansa',
        name_id: 'in-d-pb-mansa',
        region_name_id: 'in-d-pb-mansa-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-bathinda-version-25-region': {
            name: 'Bathinda',
            region_name_id: 'in-lc-pb-bathinda-version-25-region',
            name_id: 'in-lc-pb-bathinda',
            vidhansabha_constituencies: [
              {
                name: 'Mansa',
                region_name_id: 'in-vc-pb-mansa-version-25-region',
                name_id: 'in-vc-pb-mansa',
              },
              {
                name: 'Sardulgarh',
                region_name_id: 'in-vc-pb-sardulgarh-version-25-region',
                name_id: 'in-vc-pb-sardulgarh',
              },
              {
                name: 'Budhlada',
                region_name_id: 'in-vc-pb-budhlada-version-25-region',
                name_id: 'in-vc-pb-budhlada',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-mansa-version-25-region': {
            name: 'Mansa',
            name_id: 'in-vc-pb-mansa',
            region_name_id: 'in-vc-pb-mansa-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
          'in-vc-pb-sardulgarh-version-25-region': {
            name: 'Sardulgarh',
            name_id: 'in-vc-pb-sardulgarh',
            region_name_id: 'in-vc-pb-sardulgarh-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
          'in-vc-pb-budhlada-version-25-region': {
            name: 'Budhlada',
            name_id: 'in-vc-pb-budhlada',
            region_name_id: 'in-vc-pb-budhlada-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
        },
      },
      'in-d-pb-moga-version-25-region': {
        name: 'Moga',
        name_id: 'in-d-pb-moga',
        region_name_id: 'in-d-pb-moga-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-faridkot-version-25-region': {
            name: 'Faridkot',
            region_name_id: 'in-lc-pb-faridkot-version-25-region',
            name_id: 'in-lc-pb-faridkot',
            vidhansabha_constituencies: [
              {
                name: 'Nihal Singhwala',
                region_name_id: 'in-vc-pb-nihal-singhwala-version-25-region',
                name_id: 'in-vc-pb-nihal-singhwala',
              },
              {
                name: 'Bhagha Purana',
                region_name_id: 'in-vc-pb-bhagha-purana-version-25-region',
                name_id: 'in-vc-pb-bhagha-purana',
              },
              {
                name: 'Moga',
                region_name_id: 'in-vc-pb-moga-version-25-region',
                name_id: 'in-vc-pb-moga',
              },
              {
                name: 'Dharamkot',
                region_name_id: 'in-vc-pb-dharamkot-version-25-region',
                name_id: 'in-vc-pb-dharamkot',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-nihal-singhwala-version-25-region': {
            name: 'Nihal Singhwala',
            name_id: 'in-vc-pb-nihal-singhwala',
            region_name_id: 'in-vc-pb-nihal-singhwala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
          'in-vc-pb-bhagha-purana-version-25-region': {
            name: 'Bhagha Purana',
            name_id: 'in-vc-pb-bhagha-purana',
            region_name_id: 'in-vc-pb-bhagha-purana-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
          'in-vc-pb-moga-version-25-region': {
            name: 'Moga',
            name_id: 'in-vc-pb-moga',
            region_name_id: 'in-vc-pb-moga-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
          'in-vc-pb-dharamkot-version-25-region': {
            name: 'Dharamkot',
            name_id: 'in-vc-pb-dharamkot',
            region_name_id: 'in-vc-pb-dharamkot-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
        },
      },
      'in-d-pb-sri-muktsar-sahib-version-25-region': {
        name: 'Sri Muktsar Sahib',
        name_id: 'in-d-pb-sri-muktsar-sahib',
        region_name_id: 'in-d-pb-sri-muktsar-sahib-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-faridkot-version-25-region': {
            name: 'Faridkot',
            region_name_id: 'in-lc-pb-faridkot-version-25-region',
            name_id: 'in-lc-pb-faridkot',
            vidhansabha_constituencies: [
              {
                name: 'Gidderbaha',
                region_name_id: 'in-vc-pb-gidderbaha-version-25-region',
                name_id: 'in-vc-pb-gidderbaha',
              },
            ],
          },
          'in-lc-pb-firozpur-version-25-region': {
            name: 'Firozpur',
            region_name_id: 'in-lc-pb-firozpur-version-25-region',
            name_id: 'in-lc-pb-firozpur',
            vidhansabha_constituencies: [
              {
                name: 'Malout',
                region_name_id: 'in-vc-pb-malout-version-25-region',
                name_id: 'in-vc-pb-malout',
              },
              {
                name: 'Muktsar',
                region_name_id: 'in-vc-pb-muktsar-version-25-region',
                name_id: 'in-vc-pb-muktsar',
              },
            ],
          },
          'in-lc-pb-bathinda-version-25-region': {
            name: 'Bathinda',
            region_name_id: 'in-lc-pb-bathinda-version-25-region',
            name_id: 'in-lc-pb-bathinda',
            vidhansabha_constituencies: [
              {
                name: 'Lambi',
                region_name_id: 'in-vc-pb-lambi-version-25-region',
                name_id: 'in-vc-pb-lambi',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-lambi-version-25-region': {
            name: 'Lambi',
            name_id: 'in-vc-pb-lambi',
            region_name_id: 'in-vc-pb-lambi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Bathinda',
                region_name_id: 'in-lc-pb-bathinda-version-25-region',
                name_id: 'in-lc-pb-bathinda',
              },
            ],
          },
          'in-vc-pb-gidderbaha-version-25-region': {
            name: 'Gidderbaha',
            name_id: 'in-vc-pb-gidderbaha',
            region_name_id: 'in-vc-pb-gidderbaha-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Faridkot',
                region_name_id: 'in-lc-pb-faridkot-version-25-region',
                name_id: 'in-lc-pb-faridkot',
              },
            ],
          },
          'in-vc-pb-malout-version-25-region': {
            name: 'Malout',
            name_id: 'in-vc-pb-malout',
            region_name_id: 'in-vc-pb-malout-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
          'in-vc-pb-muktsar-version-25-region': {
            name: 'Muktsar',
            name_id: 'in-vc-pb-muktsar',
            region_name_id: 'in-vc-pb-muktsar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Firozpur',
                region_name_id: 'in-lc-pb-firozpur-version-25-region',
                name_id: 'in-lc-pb-firozpur',
              },
            ],
          },
        },
      },
      'in-d-pb-pathankot-version-25-region': {
        name: 'Pathankot',
        name_id: 'in-d-pb-pathankot',
        region_name_id: 'in-d-pb-pathankot-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-gurdaspur-version-25-region': {
            name: 'Gurdaspur',
            region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
            name_id: 'in-lc-pb-gurdaspur',
            vidhansabha_constituencies: [
              {
                name: 'Sujanpur',
                region_name_id: 'in-vc-pb-sujanpur-version-25-region',
                name_id: 'in-vc-pb-sujanpur',
              },
              {
                name: 'Bhoa',
                region_name_id: 'in-vc-pb-bhoa-version-25-region',
                name_id: 'in-vc-pb-bhoa',
              },
              {
                name: 'Pathankot',
                region_name_id: 'in-vc-pb-pathankot-version-25-region',
                name_id: 'in-vc-pb-pathankot',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-sujanpur-version-25-region': {
            name: 'Sujanpur',
            name_id: 'in-vc-pb-sujanpur',
            region_name_id: 'in-vc-pb-sujanpur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
          'in-vc-pb-bhoa-version-25-region': {
            name: 'Bhoa',
            name_id: 'in-vc-pb-bhoa',
            region_name_id: 'in-vc-pb-bhoa-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
          'in-vc-pb-pathankot-version-25-region': {
            name: 'Pathankot',
            name_id: 'in-vc-pb-pathankot',
            region_name_id: 'in-vc-pb-pathankot-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Gurdaspur',
                region_name_id: 'in-lc-pb-gurdaspur-version-25-region',
                name_id: 'in-lc-pb-gurdaspur',
              },
            ],
          },
        },
      },
      'in-d-pb-patiala-version-25-region': {
        name: 'Patiala',
        name_id: 'in-d-pb-patiala',
        region_name_id: 'in-d-pb-patiala-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-patiala-version-25-region': {
            name: 'Patiala',
            region_name_id: 'in-lc-pb-patiala-version-25-region',
            name_id: 'in-lc-pb-patiala',
            vidhansabha_constituencies: [
              {
                name: 'Nabha',
                region_name_id: 'in-vc-pb-nabha-version-25-region',
                name_id: 'in-vc-pb-nabha',
              },
              {
                name: 'Patiala Rural',
                region_name_id: 'in-vc-pb-patiala-rural-version-25-region',
                name_id: 'in-vc-pb-patiala-rural',
              },
              {
                name: 'Rajpura',
                region_name_id: 'in-vc-pb-rajpura-version-25-region',
                name_id: 'in-vc-pb-rajpura',
              },
              {
                name: 'Ghanaur',
                region_name_id: 'in-vc-pb-ghanaur-version-25-region',
                name_id: 'in-vc-pb-ghanaur',
              },
              {
                name: 'Sanour',
                region_name_id: 'in-vc-pb-sanour-version-25-region',
                name_id: 'in-vc-pb-sanour',
              },
              {
                name: 'Patiala',
                region_name_id: 'in-vc-pb-patiala-version-25-region',
                name_id: 'in-vc-pb-patiala',
              },
              {
                name: 'Samana',
                region_name_id: 'in-vc-pb-samana-version-25-region',
                name_id: 'in-vc-pb-samana',
              },
              {
                name: 'Shutrana',
                region_name_id: 'in-vc-pb-shutrana-version-25-region',
                name_id: 'in-vc-pb-shutrana',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-nabha-version-25-region': {
            name: 'Nabha',
            name_id: 'in-vc-pb-nabha',
            region_name_id: 'in-vc-pb-nabha-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
          'in-vc-pb-patiala-rural-version-25-region': {
            name: 'Patiala Rural',
            name_id: 'in-vc-pb-patiala-rural',
            region_name_id: 'in-vc-pb-patiala-rural-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
          'in-vc-pb-rajpura-version-25-region': {
            name: 'Rajpura',
            name_id: 'in-vc-pb-rajpura',
            region_name_id: 'in-vc-pb-rajpura-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
          'in-vc-pb-ghanaur-version-25-region': {
            name: 'Ghanaur',
            name_id: 'in-vc-pb-ghanaur',
            region_name_id: 'in-vc-pb-ghanaur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
          'in-vc-pb-sanour-version-25-region': {
            name: 'Sanour',
            name_id: 'in-vc-pb-sanour',
            region_name_id: 'in-vc-pb-sanour-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
          'in-vc-pb-patiala-version-25-region': {
            name: 'Patiala',
            name_id: 'in-vc-pb-patiala',
            region_name_id: 'in-vc-pb-patiala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
          'in-vc-pb-samana-version-25-region': {
            name: 'Samana',
            name_id: 'in-vc-pb-samana',
            region_name_id: 'in-vc-pb-samana-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
          'in-vc-pb-shutrana-version-25-region': {
            name: 'Shutrana',
            name_id: 'in-vc-pb-shutrana',
            region_name_id: 'in-vc-pb-shutrana-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
        },
      },
      'in-d-pb-rupnagar-version-25-region': {
        name: 'Rupnagar',
        name_id: 'in-d-pb-rupnagar',
        region_name_id: 'in-d-pb-rupnagar-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-anandpur-sahib-version-25-region': {
            name: 'Anandpur Sahib',
            region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
            name_id: 'in-lc-pb-anandpur-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-vc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-vc-pb-anandpur-sahib',
              },
              {
                name: 'Rupnagar',
                region_name_id: 'in-vc-pb-rupnagar-version-25-region',
                name_id: 'in-vc-pb-rupnagar',
              },
              {
                name: 'Chamkaur Sahib',
                region_name_id: 'in-vc-pb-chamkaur-sahib-version-25-region',
                name_id: 'in-vc-pb-chamkaur-sahib',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-anandpur-sahib-version-25-region': {
            name: 'Anandpur Sahib',
            name_id: 'in-vc-pb-anandpur-sahib',
            region_name_id: 'in-vc-pb-anandpur-sahib-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
          'in-vc-pb-rupnagar-version-25-region': {
            name: 'Rupnagar',
            name_id: 'in-vc-pb-rupnagar',
            region_name_id: 'in-vc-pb-rupnagar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
          'in-vc-pb-chamkaur-sahib-version-25-region': {
            name: 'Chamkaur Sahib',
            name_id: 'in-vc-pb-chamkaur-sahib',
            region_name_id: 'in-vc-pb-chamkaur-sahib-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
        },
      },
      'in-d-pb-sahibzada-ajit-singh-nagar-version-25-region': {
        name: 'Sahibzada Ajit Singh Nagar',
        name_id: 'in-d-pb-sahibzada-ajit-singh-nagar',
        region_name_id: 'in-d-pb-sahibzada-ajit-singh-nagar-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-anandpur-sahib-version-25-region': {
            name: 'Anandpur Sahib',
            region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
            name_id: 'in-lc-pb-anandpur-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Chamkaur Sahib',
                region_name_id: 'in-vc-pb-chamkaur-sahib-version-25-region',
                name_id: 'in-vc-pb-chamkaur-sahib',
              },
              {
                name: 'Kharar',
                region_name_id: 'in-vc-pb-kharar-version-25-region',
                name_id: 'in-vc-pb-kharar',
              },
              {
                name: 'S.A.S. Nagar',
                region_name_id: 'in-vc-pb-s-a-s-nagar-version-25-region',
                name_id: 'in-vc-pb-s-a-s-nagar',
              },
            ],
          },
          'in-lc-pb-patiala-version-25-region': {
            name: 'Patiala',
            region_name_id: 'in-lc-pb-patiala-version-25-region',
            name_id: 'in-lc-pb-patiala',
            vidhansabha_constituencies: [
              {
                name: 'Dera Bassi',
                region_name_id: 'in-vc-pb-dera-bassi-version-25-region',
                name_id: 'in-vc-pb-dera-bassi',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-chamkaur-sahib-version-25-region': {
            name: 'Chamkaur Sahib',
            name_id: 'in-vc-pb-chamkaur-sahib',
            region_name_id: 'in-vc-pb-chamkaur-sahib-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
          'in-vc-pb-kharar-version-25-region': {
            name: 'Kharar',
            name_id: 'in-vc-pb-kharar',
            region_name_id: 'in-vc-pb-kharar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
          'in-vc-pb-s-a-s-nagar-version-25-region': {
            name: 'S.A.S. Nagar',
            name_id: 'in-vc-pb-s-a-s-nagar',
            region_name_id: 'in-vc-pb-s-a-s-nagar-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
          'in-vc-pb-dera-bassi-version-25-region': {
            name: 'Dera Bassi',
            name_id: 'in-vc-pb-dera-bassi',
            region_name_id: 'in-vc-pb-dera-bassi-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Patiala',
                region_name_id: 'in-lc-pb-patiala-version-25-region',
                name_id: 'in-lc-pb-patiala',
              },
            ],
          },
        },
      },
      'in-d-pb-sangrur-version-25-region': {
        name: 'Sangrur',
        name_id: 'in-d-pb-sangrur',
        region_name_id: 'in-d-pb-sangrur-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-sangrur-version-25-region': {
            name: 'Sangrur',
            region_name_id: 'in-lc-pb-sangrur-version-25-region',
            name_id: 'in-lc-pb-sangrur',
            vidhansabha_constituencies: [
              {
                name: 'Lehra',
                region_name_id: 'in-vc-pb-lehra-version-25-region',
                name_id: 'in-vc-pb-lehra',
              },
              {
                name: 'Dirba',
                region_name_id: 'in-vc-pb-dirba-version-25-region',
                name_id: 'in-vc-pb-dirba',
              },
              {
                name: 'Sunam',
                region_name_id: 'in-vc-pb-sunam-version-25-region',
                name_id: 'in-vc-pb-sunam',
              },
              {
                name: 'Mehal Kalan',
                region_name_id: 'in-vc-pb-mehal-kalan-version-25-region',
                name_id: 'in-vc-pb-mehal-kalan',
              },
              {
                name: 'Dhuri',
                region_name_id: 'in-vc-pb-dhuri-version-25-region',
                name_id: 'in-vc-pb-dhuri',
              },
              {
                name: 'Sangrur',
                region_name_id: 'in-vc-pb-sangrur-version-25-region',
                name_id: 'in-vc-pb-sangrur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-lehra-version-25-region': {
            name: 'Lehra',
            name_id: 'in-vc-pb-lehra',
            region_name_id: 'in-vc-pb-lehra-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-dirba-version-25-region': {
            name: 'Dirba',
            name_id: 'in-vc-pb-dirba',
            region_name_id: 'in-vc-pb-dirba-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-sunam-version-25-region': {
            name: 'Sunam',
            name_id: 'in-vc-pb-sunam',
            region_name_id: 'in-vc-pb-sunam-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-mehal-kalan-version-25-region': {
            name: 'Mehal Kalan',
            name_id: 'in-vc-pb-mehal-kalan',
            region_name_id: 'in-vc-pb-mehal-kalan-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-dhuri-version-25-region': {
            name: 'Dhuri',
            name_id: 'in-vc-pb-dhuri',
            region_name_id: 'in-vc-pb-dhuri-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
          'in-vc-pb-sangrur-version-25-region': {
            name: 'Sangrur',
            name_id: 'in-vc-pb-sangrur',
            region_name_id: 'in-vc-pb-sangrur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Sangrur',
                region_name_id: 'in-lc-pb-sangrur-version-25-region',
                name_id: 'in-lc-pb-sangrur',
              },
            ],
          },
        },
      },
      'in-d-pb-shahid-bhagat-singh-nagar-version-25-region': {
        name: 'Shaheed Bhagat Singh Nagar',
        name_id: 'in-d-pb-shahid-bhagat-singh-nagar',
        region_name_id: 'in-d-pb-shahid-bhagat-singh-nagar-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-anandpur-sahib-version-25-region': {
            name: 'Anandpur Sahib',
            region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
            name_id: 'in-lc-pb-anandpur-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Banga',
                region_name_id: 'in-vc-pb-banga-version-25-region',
                name_id: 'in-vc-pb-banga',
              },
              {
                name: 'Nawan Shahr',
                region_name_id: 'in-vc-pb-nawan-shahr-version-25-region',
                name_id: 'in-vc-pb-nawan-shahr',
              },
              {
                name: 'Balachaur',
                region_name_id: 'in-vc-pb-balachaur-version-25-region',
                name_id: 'in-vc-pb-balachaur',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-banga-version-25-region': {
            name: 'Banga',
            name_id: 'in-vc-pb-banga',
            region_name_id: 'in-vc-pb-banga-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
          'in-vc-pb-nawan-shahr-version-25-region': {
            name: 'Nawan Shahr',
            name_id: 'in-vc-pb-nawan-shahr',
            region_name_id: 'in-vc-pb-nawan-shahr-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
          'in-vc-pb-balachaur-version-25-region': {
            name: 'Balachaur',
            name_id: 'in-vc-pb-balachaur',
            region_name_id: 'in-vc-pb-balachaur-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Anandpur Sahib',
                region_name_id: 'in-lc-pb-anandpur-sahib-version-25-region',
                name_id: 'in-lc-pb-anandpur-sahib',
              },
            ],
          },
        },
      },
      'in-d-pb-tarn-taran-version-25-region': {
        name: 'Tarn Taran',
        name_id: 'in-d-pb-tarn-taran',
        region_name_id: 'in-d-pb-tarn-taran-version-25-region',
        loksabha_constituencies: {
          'in-lc-pb-khadoor-sahib-version-25-region': {
            name: 'Khadoor Sahib',
            region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
            name_id: 'in-lc-pb-khadoor-sahib',
            vidhansabha_constituencies: [
              {
                name: 'Tarn Taran',
                region_name_id: 'in-vc-pb-tarn-taran-version-25-region',
                name_id: 'in-vc-pb-tarn-taran',
              },
              {
                name: 'Khem Karan',
                region_name_id: 'in-vc-pb-khem-karan-version-25-region',
                name_id: 'in-vc-pb-khem-karan',
              },
              {
                name: 'Patti',
                region_name_id: 'in-vc-pb-patti-version-25-region',
                name_id: 'in-vc-pb-patti',
              },
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-vc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-vc-pb-khadoor-sahib',
              },
              {
                name: 'Baba Bakala',
                region_name_id: 'in-vc-pb-baba-bakala-version-25-region',
                name_id: 'in-vc-pb-baba-bakala',
              },
            ],
          },
        },
        vidhansabha_constituencies: {
          'in-vc-pb-tarn-taran-version-25-region': {
            name: 'Tarn Taran',
            name_id: 'in-vc-pb-tarn-taran',
            region_name_id: 'in-vc-pb-tarn-taran-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-khem-karan-version-25-region': {
            name: 'Khem Karan',
            name_id: 'in-vc-pb-khem-karan',
            region_name_id: 'in-vc-pb-khem-karan-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-patti-version-25-region': {
            name: 'Patti',
            name_id: 'in-vc-pb-patti',
            region_name_id: 'in-vc-pb-patti-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-khadoor-sahib-version-25-region': {
            name: 'Khadoor Sahib',
            name_id: 'in-vc-pb-khadoor-sahib',
            region_name_id: 'in-vc-pb-khadoor-sahib-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
          'in-vc-pb-baba-bakala-version-25-region': {
            name: 'Baba Bakala',
            name_id: 'in-vc-pb-baba-bakala',
            region_name_id: 'in-vc-pb-baba-bakala-version-25-region',
            loksabha_constituencies: [
              {
                name: 'Khadoor Sahib',
                region_name_id: 'in-lc-pb-khadoor-sahib-version-25-region',
                name_id: 'in-lc-pb-khadoor-sahib',
              },
            ],
          },
        },
      },
    },
  },
};
