import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Modal,
  Table,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

const Plants = ({ auth, isAdmin, token }) => {
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || 'https://plantme.blakerunner.com';
  const history = useHistory({});
  const [plants, setPlants] = useState([]);
  const [plantSelected, setPlantSelected] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalPlantName, setModalPlantName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/v1/plant`);
      setPlants(data.data.plants);
    };
    fetchData();
  }, [REACT_APP_SERVER_URL]);

  const handleClose = () => {
    setShowEditModal(false);
    setShowCreateModal(false);
  };

  const updatePlants = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/v1/plant`);
    setPlants(data.data.plants);
  };

  const addItem = async (id) => {
    axios({
      method: 'put',
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `${REACT_APP_SERVER_URL}/api/v1/user`,
      data: {
        plant: { id },
      },
    })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => console.log(err.message));
  };

  const deleteItem = async (plant) => {
    axios({
      method: 'delete',
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `${REACT_APP_SERVER_URL}/api/v1/plant`,
      data: {
        plant,
      },
    })
      .then((response) => {
        console.log(response.data.message);
        updatePlants();
      })
      .catch((err) => console.log(err.message));
  };

  const editItem = async (plant) => {
    setPlantSelected(plant);
    setShowEditModal(true);
  };

  const createItem = async () => {
    setPlantSelected({});
    setShowCreateModal(true);
  };

  const onEditFormSubmit = async () => {
    setShowEditModal(false);
    console.log('Submitting Edit');
    axios({
      method: 'put',
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `${REACT_APP_SERVER_URL}/api/v1/plant`,
      data: {
        plant: { id: plantSelected.id, name: modalPlantName },
      },
    })
      .then((response) => {
        console.log(response.data.message);
        updatePlants();
      })
      .catch((err) => console.log(err.message));
  };

  const onCreateFormSubmit = async () => {
    setShowCreateModal(false);
    console.log('Submitting Create');
    axios({
      method: 'post',
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `${REACT_APP_SERVER_URL}/api/v1/plant`,
      data: {
        plant: { name: modalPlantName },
      },
    })
      .then((response) => {
        console.log(response.data.message);
        updatePlants();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className='container flex-auto text-center my-2'>
        <h2>Plant Database</h2>
        {auth.isAuthenticated && (
          <div>
            <Button className='my-4' variant='primary' onClick={createItem}>
              Create New Plant
            </Button>{' '}
          </div>
        )}
        <Table striped border hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              {auth.isAuthenticated && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, idx) => (
              <tr key={idx}>
                <td>{plant.id}</td>
                <td>{plant.name}</td>
                {auth.isAuthenticated && (
                  <td>
                    <Button
                      variant='outline-success'
                      onClick={() => addItem(plant.id)}>
                      Add
                    </Button>{' '}
                  </td>
                )}
                {auth.isAuthenticated && isAdmin && (
                  <td>
                    <Button
                      variant='outline-warning'
                      onClick={() => editItem(plant)}>
                      Edit
                    </Button>{' '}
                  </td>
                )}
                {auth.isAuthenticated && isAdmin && (
                  <td>
                    <Button
                      variant='outline-danger'
                      onClick={() => deleteItem(plant)}>
                      Delete
                    </Button>{' '}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          className='edit-plant-modal'
          show={showEditModal}
          onHide={handleClose}
          size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Edit Plant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3' controlId='plantNameControl'>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>Name</InputGroup.Text>
                  <FormControl
                    type='text'
                    onChange={(e) => setModalPlantName(e.target.value)}
                    defaultValue={plantSelected.name}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='outline-warning'
              type='submit'
              onClick={onEditFormSubmit}>
              Submit Edit
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          className='create-plant-modal'
          show={showCreateModal}
          onHide={handleClose}
          size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Create Plant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3' controlId='plantNameControl'>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>Name</InputGroup.Text>
                  <FormControl
                    type='text'
                    onChange={(e) => setModalPlantName(e.target.value)}
                    defaultValue=''
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='outline-primary'
              type='submit'
              onClick={onCreateFormSubmit}>
              Submit Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Plants;
