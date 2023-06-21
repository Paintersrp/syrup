import { FC, Fragment, useEffect, useState } from 'react';

import { Item } from '@/components/Containers';
import { Media } from '@/components/Media';

import { Base } from '@/theme/base';
import { useBreakpoint } from '@/hooks';
import { ButtonBar } from '@/features/editable';

type ServiceProcesImageProps = {
  imageItem: any;
  preview?: boolean;
  editMode: boolean;
};

export const ServiceProcessImage: FC<ServiceProcesImageProps> = ({
  imageItem,
  preview = false,
  editMode,
}) => {
  const isMediumScreen = useBreakpoint('md');

  const [data, setData] = useState(imageItem);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setData(imageItem);
  }, [imageItem]);

  return (
    <>
      {data ? (
        <Item
          xs={12}
          sm={12}
          md={12}
          lg={preview ? 12 : 8}
          style={{
            paddingRight: isMediumScreen ? 0 : 0,
            display: 'flex',
            order: isMediumScreen ? 1 : 2,
          }}
          justify="center"
          align="flex-start"
        >
          {
            !editing ? (
              <Fragment>
                <Base minw="100%" bs={1} br={8}>
                  <Media src={data.image || imageItem} altText="service-process-image" />
                </Base>
                {!editing && editMode && (
                  <ButtonBar
                    editClick={() => setEditing(!editing)}
                    adminLink="processimageitem"
                    text="Process Image Item"
                    obj={data.id}
                  />
                )}
              </Fragment>
            ) : null
            // <form onSubmit={handleSubmit}>
            //   <Grid container flex justifyContent="center" style={{ marginTop: 16, padding: 8 }}>
            //     {data.image && (
            //       <ImageEdit
            //         xs={newImage ? 6 : 12}
            //         header="Current Image"
            //         image={`${data.image}/`}
            //       />
            //     )}
            //     {newImage ? <ImageEdit header="New Image" image={`${newImage}`} /> : null}
            //     <ImageInput
            //       handleChange={handleImageChange}
            //       handleClick={handleClick}
            //       newImage={newImage}
            //       newImageName={newImageName}
            //     />
            //   </Grid>
            //   <UpdateCancelButtonMenu
            //     handleCancel={() => setEditing(!editing)}
            //     position="center"
            //     placement={'bottom'}
            //   />
            // </form>
          }
        </Item>
      ) : null}
    </>
  );
};
