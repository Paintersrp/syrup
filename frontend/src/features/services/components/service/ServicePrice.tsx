// import { FC, useEffect, useState } from 'react';

// type ServicePriceProps = {
//   data: any;
//   editMode: boolean;
// };

// export const ServicePrice: FC<ServicePriceProps> = ({ data, editMode }) => {
//   const [priceData, setPriceData] = useState(data);
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     setPriceData(data);
//   }, [data]);

//   const updatePrice = (updatePrice: any) => {
//     setPriceData(updatePrice);
//     setEditing(false);
//   };

//   return (
//     <div className={classes.priceContainer}>
//       {!editing ? (
//         <Typography
//           variant="h2"
//           color="primary"
//           className={classes.price}
//           style={{ marginBottom: 8, textDecoration: 'underline' }}
//         >
//           ${priceData.price}/mo
//         </Typography>
//       ) : (
//         <ServicePriceEdit
//           price={priceData}
//           updatePrice={updatePrice}
//           handleCancel={() => setEditing(!editing)}
//         />
//       )}
//       {!editing && editMode ? (
//         <div style={{ width: '100%' }}>
//           <EditDeleteButtonMenu
//             editClick={() => setEditing(!editing)}
//             hideDelete
//             position="center"
//             adminLink="servicetier"
//             text="Service Tier"
//             obj={priceData.id}
//           />
//         </div>
//       ) : null}
//     </div>
//   );
// };
export {};
