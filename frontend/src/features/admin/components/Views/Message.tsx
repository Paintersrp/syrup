import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { breakPoints, palettes, useBreakpoint } from '@/utils';
import { axios } from '@/lib';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text, Tooltip } from '@/components/Elements';
import { Button, IconButton } from '@/components/Buttons';
import { Switch } from '@/components/Form';
import { ConfirmationModal } from '@/components/Built';

interface MessageProps {
  message: {
    id: string;
    is_read: boolean;
    is_archived: boolean;
    subject: string;
    name: string;
    created_at: string;
    message: string;
    [key: string]: any;
  };
  metadata: {
    [key: string]: {
      verbose_name: string;
    };
  };
  deleteBtn?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, metadata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useBreakpoint(breakPoints.sm);

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>(message);
  const [originalRead, setOriginalRead] = useState(message.is_read);
  const [originalArchived, setOriginalArchived] = useState(message.is_archived);

  useEffect(() => {
    setFormData(message);
  }, [message]);

  //encapsulate
  const handleBackButtonClick = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 250);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selected);
    handleClose();
  };

  const handleDelete = (item: any) => {
    handleOpen();
    setSelected(item);
  };

  const confirmedDelete = (selected: any) => {
    const deleteEndpoint = `messages/${selected.id}/`;

    axios
      .delete(deleteEndpoint)
      .then(() => {
        handleBackButtonClick();
        dispatch({
          type: 'ALERT_SUCCESS',
          message: `Message - Object: ${selected.id} Deleted`,
        });
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`/messages/${formData.id}/`, formData);
      setFormData(res.data);
      setOriginalRead(res.data.is_read);
      setOriginalArchived(res.data.is_archived);
      dispatch({ type: 'ALERT_SUCCESS', message: 'Data updated' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Surface
        boxShadow={1}
        br={12}
        a="c"
        j="c"
        mt={32}
        mb={8}
        px={4}
        py={4}
        className="fade-in"
        innerStyle={{ minWidth: isSmallScreen ? 370 : 800 }}
      >
        <Flexer a="c" j="sb">
          <Tooltip text="Go Back" position="bottom">
            <IconButton
              fontSize="24px"
              material="arrow_back"
              size="t"
              onClick={handleBackButtonClick}
              className="secondary-button"
              iconColor={palettes.secondary.main}
            />
          </Tooltip>
          <Text w="auto" t="body1" fw="500" c="#718096">
            #{formData.id}
          </Text>
        </Flexer>

        <Divider mb={18} mt={18} />
        <Flexer fd="column">
          <Text t="h4" fw="600" c="#2D3748" mb={8}>
            {formData.subject}
          </Text>
          <Text t="subtitle1" fw="400" c="#718096" mb={24}>
            {formData.name} |{' '}
            {formData.created_at
              ? new Date(formData.created_at).toLocaleString()
              : new Date(Date.now()).toLocaleString()}
          </Text>
          <Text t="body1" fw="500" c="#2D3748" style={{ wordBreak: 'break-word', minHeight: 125 }}>
            {formData.message}
          </Text>
          <Divider mt={18} mb={18} />
          <Text t="h5" fw="600" c="#4A5568">
            Message Details
          </Text>
          <Text t="subtitle1" fw="400" c="#718096">
            View the details of the message below
          </Text>
        </Flexer>
        <Container justify="flex-start" spacing={2}>
          {Object.keys(formData).map((key) =>
            key === 'id' || key === 'message' || key === 'is_replied' ? null : (
              <Item xs={12} sm={6} md={4} lg={3} key={key} fd="column">
                <Text t="subtitle2" fw="600" c={palettes.secondary.main}>
                  {metadata[key].verbose_name}:
                </Text>
                <Text
                  mb={24}
                  t="body1"
                  fw="500"
                  style={{ wordBreak: 'break-word' }}
                  c={
                    typeof formData[key] === 'boolean'
                      ? formData[key]
                        ? palettes.success.light
                        : '#718096'
                      : '#718096'
                  }
                >
                  {key === 'created_at' ? (
                    `${new Date(formData.created_at).toLocaleString()}`
                  ) : key === 'is_read' || key === 'is_archived' ? (
                    <Flexer h={20} a="c">
                      <Switch value={formData[key]} name={key} onChange={handleChange} />
                      {((key === 'is_read' && formData[key] !== originalRead) ||
                        (key === 'is_archived' && formData[key] !== originalArchived)) && (
                        <Button ml={8} onClick={handleSubmit} className="success-button">
                          SAVE
                        </Button>
                      )}
                    </Flexer>
                  ) : (
                    formData[key]
                  )}
                </Text>
              </Item>
            )
          )}
        </Container>

        <Flexer j="fe">
          <Tooltip text={`Delete Message Object: ${formData.id}`} position="top">
            <IconButton
              fontSize="21px"
              material="delete"
              size="t"
              onClick={() => handleDelete(message)}
              iconColor={palettes.error.main}
              className="error-button"
            />
          </Tooltip>
        </Flexer>
      </Surface>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this?"
      />
    </React.Fragment>
  );
};

export default Message;
