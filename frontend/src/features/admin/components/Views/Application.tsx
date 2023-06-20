import { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonBar, ConfirmationModal } from '@/components/Built';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text, Tooltip } from '@/components/Elements';
import { Button, IconButton } from '@/components/Buttons';
import { Switch } from '@/components/Form';
import { useBreakpoint } from '@/hooks';
import { axios } from '@/lib/api';
import { colors } from '@/theme/common';
import { useAlertStore } from '@/stores/alert';

interface ApplicationProps {
  application: any;
  job: any;
  metadata: any;
}

const Application: FC<ApplicationProps> = ({ application, job, metadata }) => {
  const { showAlert } = useAlertStore();

  const navigate = useNavigate();
  const isSmallScreen = useBreakpoint('sm');

  const [selected, setSelected] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(application);
  const [jobData, setJobData] = useState(job);
  const [originalStatus, setOriginalStatus] = useState(application.status);
  const [originalFilled, setOriginalFilled] = useState(job.filled);

  const handleBackButtonClick = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 250);
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
    setSelected([item]);
  };

  const confirmedDelete = (selected: any[]) => {
    const deleteEndpoint = `application/${selected[0].id}/`;

    axios
      .delete(deleteEndpoint)
      .then(() => {
        handleBackButtonClick();
        showAlert('success', `Application - Object: ${selected[0].id} Deleted`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleJobChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJobData({
      ...jobData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`/application/${formData.id}/`, formData);
      setFormData(res.data);
      setOriginalStatus(res.data.status);
      showAlert('success', 'Data updated');
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`/jobposting/${jobData.id}/`, jobData);
      setJobData(res.data);
      setOriginalFilled(res.data.filled);
      showAlert('success', 'Data updated');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Surface
      boxShadow={0}
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
            icon="arrow_back"
            size="tiny"
            onClick={handleBackButtonClick}
            palette="secondary"
            variant="hover"
          />
        </Tooltip>
        <Text w="auto" t="body1" fw="500" c="#718096">
          #{formData.id}
        </Text>
      </Flexer>
      <Divider mb={18} mt={18} />
      <Text t="h4" fw="600" c="#2D3748" mb={0}>
        {jobData.position} Application
      </Text>
      <Text t="subtitle1" fw="500" c="#718096" mb={4}>
        {jobData.location} | {jobData.type}
      </Text>
      <Text t="body1" fw="500" c="#2D3748">
        From: {formData.first_name} {formData.last_name} |{' '}
        {formData.created_at
          ? new Date(formData.created_at).toLocaleString()
          : new Date(Date.now()).toLocaleString()}
      </Text>

      <Divider mt={18} mb={18} />

      <Flexer a="c" j="sb">
        <Flexer fd="column">
          <Text t="h5" fw="600" c="#4A5568">
            Job Details
          </Text>
          <Text t="subtitle1" fw="500" c="#718096">
            View the details of the job below.
          </Text>
        </Flexer>
        <ButtonBar adminLink={`jobposting`} text="Job" />
      </Flexer>

      <Container justify="flex-start">
        {Object.keys(jobData).map((key) =>
          key === 'id' ||
          key === 'requirements' ||
          key === 'responsibilities' ||
          key === 'who_we_are' ||
          key === 'why_apply' ||
          key === 'looking_for' ||
          key === 'tagline' ? null : (
            <Item xs={12} sm={6} md={4} lg={3} key={key} fd="column" mt={4}>
              <Text t="subtitle2" fw="600" c={colors.secondary.main}>
                {key === 'created_at'
                  ? 'Created At'
                  : key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                :
              </Text>
              <Text t="body1" fw="500" c="#718096" style={{ wordBreak: 'break-word' }}>
                {key === 'created_at' ? (
                  `${new Date(jobData.created_at).toLocaleString()}`
                ) : key === 'filled' ? (
                  <Flexer h={20} a="c">
                    <Switch value={jobData.filled} name={key} onChange={handleJobChange} />
                    {key === 'filled' && jobData.filled !== originalFilled && (
                      <Button ml={8} onClick={handleJobSubmit} className="success-button">
                        SAVE
                      </Button>
                    )}
                  </Flexer>
                ) : (
                  jobData[key]
                )}
              </Text>
            </Item>
          )
        )}
      </Container>

      <Divider mt={18} mb={18} />

      <Flexer a="c" j="sb">
        <Flexer fd="column">
          <Text t="h5" fw="600" c="#4A5568">
            Application Details
          </Text>
          <Text t="subtitle1" fw="500" c="#718096">
            View the details of the application below.
          </Text>
        </Flexer>
      </Flexer>
      <Container j="fs">
        {Object.keys(formData).map((key) =>
          key === 'id' || key === 'message' || key === 'job' ? null : (
            <Item xs={12} sm={6} md={4} lg={3} key={key} fd="column" mt={4}>
              <Text t="subtitle2" fw="600" c={colors.secondary.main}>
                {metadata[key].verbose_name}:
              </Text>
              <Text t="body1" fw="500" style={{ wordBreak: 'break-word' }} c="#718096">
                {typeof formData[key] === 'boolean' ? (
                  formData[key] ? (
                    'Yes'
                  ) : (
                    'No'
                  )
                ) : key === 'created_at' ? (
                  `${new Date(formData.created_at).toLocaleString()}`
                ) : key === 'resume' ? (
                  <a href={formData[key]} download className="link-text">
                    Download Resume
                  </a>
                ) : key === 'status' ? (
                  <Flexer h={20} a="c">
                    <Switch value={formData.status} name={key} onChange={handleChange} />
                    {key === 'status' && formData[key] !== originalStatus && (
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
        <Tooltip text={`Delete Application Object: ${formData.id}`} position="top">
          <IconButton
            icon="delete"
            size="tiny"
            palette="error"
            variant="hover"
            onClick={() => handleDelete(application)}
          />
        </Tooltip>
      </Flexer>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this?"
      />
    </Surface>
  );
};

export default Application;
