export type Lcda = {
  name: string;
  label?: string;
  value?: string;
};

export type Areas = {
  lga: string;
  lcda: Lcda[];
};

const lagosStateLGAs = [
  {
    lga: 'LAGOSMAINLAND',
    lcda: [
      { name: 'MAKOKO', label: 'MAKOKO', value: 'MAKOKO' },
      { name: 'GLOVER', label: 'GLOVER', value: 'GLOVER' },
      { name: 'EBUTE-METTA', label: 'EBUTE-METTA', value: 'EBUTE-METTA' },
      { name: 'OKO-BABA', label: 'OKO-BABA', value: 'OKO-BABA' },
      { name: 'OYADIRAN-ESTATE', label: 'OYADIRAN-ESTATE', value: 'OYADIRAN-ESTATE' },
      { name: 'ALAGOMEJI', label: 'ALAGOMEJI', value: 'ALAGOMEJI' },
      { name: 'SABO-YABA', label: 'SABO-YABA', value: 'SABO-YABA' },
      { name: 'IWAYA', label: 'IWAYA', value: 'IWAYA' },
      { name: 'ONIKE', label: 'ONIKE', value: 'ONIKE' },
      { name: 'ABULE-OJA', label: 'ABULE-OJA', value: 'ABULE-OJA' },
      { name: 'ABULE-IJESHA', label: 'ABULE-IJESHA', value: 'ABULE-IJESHA' },
      { name: 'TEJUOSHO-YABA', label: 'TEJUOSHO-YABA', value: 'TEJUOSHO-YABA' },
    ],
  },
  {
    lga: 'SHOMOLU',
    lcda: [
      { name: 'ALADE', label: 'ALADE', value: 'ALADE' },
      { name: 'PALMGROVE', label: 'PALMGROVE', value: 'PALMGROVE' },
      { name: 'IJEBUTEDO', label: 'IJEBUTEDO', value: 'IJEBUTEDO' },
      { name: 'ONIPANU', label: 'ONIPANU', value: 'ONIPANU' },
      { name: 'BAJULAIYE', label: 'BAJULAIYE', value: 'BAJULAIYE' },
      { name: 'IGBARI', label: 'IGBARI', value: 'IGBARI' },
      { name: 'FOLA-AGORO', label: 'FOLA-AGORO', value: 'FOLA-AGORO' },
      { name: 'FADEYI', label: 'FADEYI', value: 'FADEYI' },
      { name: 'IGBOBI', label: 'IGBOBI', value: 'IGBOBI' },
      { name: 'GBAGADA-PHASE-I', label: 'GBAGADA-PHASE-I', value: 'GBAGADA-PHASE-I' },
      { name: 'OBANIKORO', label: 'OBANIKORO', value: 'OBANIKORO' },
      { name: 'PEDRO', label: 'PEDRO', value: 'PEDRO' },
      { name: 'LAD-LAK', label: 'LAD-LAK', value: 'LAD-LAK' },
      { name: 'AKOKA', label: 'AKOKA', value: 'AKOKA' },
      { name: 'ILAJE', label: 'ILAJE', value: 'ILAJE' },
      { name: 'BARIGA', label: 'BARIGA', value: 'BARIGA' },
    ],
  },
  {
    lga: 'SURULERE',
    lcda: [
      { name: 'AKINHANMI/COLE', label: 'AKINHANMI/COLE', value: 'AKINHANMI/COLE' },
      { name: 'GBAJA/STADIUM', label: 'GBAJA/STADIUM', value: 'GBAJA/STADIUM' },
      { name: 'SHITTA/OGUNLANA', label: 'SHITTA/OGUNLANA', value: 'SHITTA/OGUNLANA' },
      { name: 'OJUELEGBA', label: 'OJUELEGBA', value: 'OJUELEGBA' },
      { name: 'ORILE', label: 'ORILE', value: 'ORILE' },
      { name: 'COKER', label: 'COKER', value: 'COKER' },
      { name: 'AGUDA', label: 'AGUDA', value: 'AGUDA' },
      { name: 'IJESHATEDO', label: 'IJESHATEDO', value: 'IJESHATEDO' },
      { name: 'ITIRE', label: 'ITIRE', value: 'ITIRE' },
      { name: 'ILASAMAJA', label: 'ILASAMAJA', value: 'ILASAMAJA' },
    ],
  },
  {
    lga: 'MUSHIN',
    lcda: [{ name: 'MUSHIN', label: 'MUSHIN', value: 'MUSHIN' }],
  },
];
// const lagosStateLGAs = [
//   {
//     lga: 'SHOMOLU 01',
//     lcda: [
//       { name: 'ALADE', value: 'ALADE', label: 'ALADE' },
//       { name: 'PALMGROVE/IJEBUTEDO', label: 'PALMGROVE/IJEBUTEDO', value: 'PALMGROVE/IJEBUTEDO' },
//       { name: 'ONIPANU', label: 'ONIPANU', value: 'ONIPANU' },
//     ],
//   },
//   {
//     lga: 'LAGOSMAINLAND 01',
//     lcda: [
//       { name: 'MAKOKO', label: 'MAKOKO', value: 'MAKOKO' },
//       { name: 'GLOVER/EBUTE METTA', label: 'GLOVER/EBUTE METTA', value: 'GLOVER/EBUTE METTA' },
//       { name: 'OKO-BABA', label: 'OKO-BABA', value: 'OKO-BABA' },
//     ],
//   },
//   {
//     lga: 'SURULERE 01',
//     lcda: [
//       { name: 'AKINHANMI/COLE', label: 'AKINHANMI/COLE', value: 'AKINHANMI/COLE' },
//       { name: 'GBAJA/STADIUM', label: 'GBAJA/STADIUM', value: 'GBAJA/STADIUM' },
//       { name: 'SHITTA/OGUNLANA', label: 'SHITTA/OGUNLANA', value: 'SHITTA/OGUNLANA' },
//     ],
//   },
//   {
//     lga: 'SHOMOLU 02',
//     lcda: [
//       {
//         name: 'FOLAGORO/BAJULAIYE/IGBARI',
//         label: 'FOLAGORO/BAJULAIYE/IGBARI',
//         value: 'FOLAGORO/BAJULAIYE/IGBARI',
//       },
//       { name: 'IGBOBI/FADEYI', label: 'IGBOBI/FADEYI', value: 'IGBOBI/FADEYI' },
//       { name: 'BAJULAIYE', label: 'BAJULAIYE', value: 'BAJULAIYE' },
//     ],
//   },
//   {
//     lga: 'LAGOSMAINLAND 02',
//     lcda: [
//       { name: 'OYADIRAN ESTATE', label: 'OYADIRAN ESTATE', value: 'OYADIRAN ESTATE' },
//       { name: 'ALAGOMEJI', label: 'ALAGOMEJI', value: 'ALAGOMEJI' },
//       { name: 'SABO-YABA', label: 'SABO-YABA', value: 'SABO-YABA' },
//       { name: 'IWAYA', label: 'IWAYA', value: 'IWAYA' },
//       { name: 'ONIKE', label: 'ONIKE', value: 'ONIKE' },
//       {
//         name: 'ABULE-OJA/ABULE-IJESHA',
//         label: 'ABULE-OJA/ABULE-IJESHA',
//         value: 'ABULE-OJA/ABULE-IJESHA',
//       },
//     ],
//   },
//   {
//     lga: 'SURULERE 02',
//     lcda: [
//       { name: 'YABA/OJUELEGBA', label: 'YABA/OJUELEGBA', value: 'YABA/OJUELEGBA' },
//       { name: 'ORILE', label: 'ORILE', value: 'ORILE' },
//       { name: 'COKER', label: 'COKER', value: 'COKER' },
//       { name: 'AGUDA', label: 'AGUDA', value: 'AGUDA' },
//       { name: 'ITIRE', label: 'ITIRE', value: 'ITIRE' },
//       { name: 'IKATE', label: 'IKATE', value: 'IKATE' },
//     ],
//   },
//   {
//     lga: 'SHOMOLU 03',
//     lcda: [
//       {
//         name: 'GBAGADA PHASE I/OBANIKORO/PEDRO',
//         label: 'GBAGADA PHASE I/OBANIKORO/PEDRO',
//         value: 'GBAGADA PHASE I/OBANIKORO/PEDRO',
//       },
//       { name: 'Lad-Lak/Bariga', label: 'Lad-Lak/Bariga', value: 'Lad-Lak/Bariga' },
//       { name: 'ILAJE/AKOKA', label: 'ILAJE/AKOKA', value: 'ILAJE/AKOKA' },
//     ],
//   },
//   {
//     lga: 'SURULERE 03',
//     lcda: [
//       { name: 'IJESHATEDO', label: 'IJESHATEDO', value: 'IJESHATEDO' },
//       { name: 'ITIRE', label: 'ITIRE', value: 'ITIRE' },
//       { name: 'IKATE', label: 'ITIRE', value: 'ITIRE' },
//     ],
//   },
// ];

const retailSegment = [
  { label: 'Provision Store', value: 'Provision Store' },
  { label: 'Kiosks', value: 'Kiosks' },
  { label: 'Super Market', value: 'Super Market' },
  { label: 'Restaurant (Bukka)', value: 'Restaurant (Bukka)' },
  { label: 'Beer Parlour', value: 'Beer Parlour' },
  { label: 'Membership Club', value: 'Membership Club' },
  {
    label: 'International Bar & Restaurant',
    value: 'International Bar & Restaurant',
  },
  { label: 'Night Club', value: 'Night Club' },
  { label: 'Hotel', value: 'Hotel' },
  { label: 'Fast Food', value: 'Fast Food' },
  { label: 'Informal Convenience', value: 'Informal Convenience' },
  { label: 'Mini-Mart', value: 'Mini-Mart' },
  { label: 'Chemist/Pharmacy', value: 'Chemist/Pharmacy' },
];

const wholesaleSegment = [
  { label: 'Bulk Breaker', value: 'Bulk Breaker' },
  { label: 'Wholesaler', value: 'Wholesaler' },
  { label: 'Van Salesman', value: 'Van Salesman' },
];

export { lagosStateLGAs, retailSegment, wholesaleSegment };
