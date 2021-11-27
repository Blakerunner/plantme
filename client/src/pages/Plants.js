import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Plants = ({ auth, token }) => {
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || 'https://plantme.blakerunner.com';
  const history = useHistory({});
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/v1/plant`);
      setPlants(data.data.plants);
    };
    fetchData();
  }, [REACT_APP_SERVER_URL]);

  const toMainPage = (e) => {
    e.preventDefault();
    history.push('/');
  };

  const addItem = async (id) => {
    axios({
      method: 'put',
      headers: {
        authorization: `Bearer ${token}` 
      },
      url: `${REACT_APP_SERVER_URL}/api/v1/user`,
      data: {
        plant: { id }
      }
    }).then((response) => {
      console.log(response.data.message)
    })
    .catch((err) => console.log(err.message));
  }

  return (
    <>
      <table style={{ border: '1px solid black', margin: '5px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>Id</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Name</th>
            {
              auth.isAuthenticated && (
                <th style={{ border: '1px solid black', padding: '5px' }}>Actions</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, idx) => (
            <tr key={idx}>
              <td style={{ border: '1px solid black', padding: '5px' }}>
                {plant.id}
              </td>
              <td style={{ border: '1px solid black', padding: '5px' }}>
                {plant.name}
              </td>
              {
                auth.isAuthenticated && (
                  <td style={{ border: '1px solid black', padding: '5px' }}>
                    <button onClick={() => addItem(plant.id)}>Add</button>
                  </td>
                )
              }
              
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        variant='secondary'
        style={{ margin: '10px' }}
        onClick={(e) => toMainPage(e)}
      >
        Back
      </Button>{' '}
    </>
  );
};

export default Plants;
