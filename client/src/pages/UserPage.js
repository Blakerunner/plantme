import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const UserPage = ({ token }) => {
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || 'https://plantme.blakerunner.com';

  const [data, setData] = useState(null);

  const deleteItem = async (id) => {
    axios
      .delete(`${REACT_APP_SERVER_URL}/api/v1/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: { plant: { id } },
      })
      .then((response) => {
        console.log(response.data.message);
        updateUserPlants();
      })
      .catch((err) => console.log(err.message));
  };

  const updateUserPlants = async () => {
    if (token) {
      axios(`${REACT_APP_SERVER_URL}/api/v1/user`, {
        headers: { authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response === null) {
            setData({ plants: [{ id: '1111', name: 'Dummy Plant' }] });
          }
          setData(response.data.data.user.Plants);
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    if (token) {
      axios(`${REACT_APP_SERVER_URL}/api/v1/user`, {
        headers: { authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response === null) {
            setData({ plants: [{ id: '1111', name: 'Dummy Plant' }] });
          }
          setData(response.data.data.user.Plants);
        })
        .catch((err) => console.log(err.message));
    }
  }, [token, REACT_APP_SERVER_URL]);

  if (data) {
    return (
      <>
        <div className='container flex-auto text-center my-2'>
          <h2>Plants Bookmarked</h2>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Plants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((plant, idx) => (
                  <tr key={idx}>
                    <td>{plant.id}</td>
                    <td>{plant.name}</td>
                    <td>
                      <Button
                        variant='outline-warning'
                        onClick={() => deleteItem(plant.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='container flex-auto'>
          <p>loading...</p>
        </div>
      </>
    );
  }
};

export default UserPage;
