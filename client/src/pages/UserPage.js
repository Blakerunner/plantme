import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const UserPage = ({token}) => {
  const history = useHistory();

  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || "https://plantme.blakerunner.com";

  const [data, setData] = useState(null);

  const deleteItem = async (id) => {
    axios.delete(`${REACT_APP_SERVER_URL}/api/v1/user`, {
      headers: {
        authorization: `Bearer ${token}` 
      },
      data: { plant: { id } }
    })
    .then((response) => {
      console.log(response.data.message)
    })
    .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    if ( token ) {
      axios(`${REACT_APP_SERVER_URL}/api/v1/user`, {
        headers: { authorization: `Bearer ${token}` }
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

  const toMainPage = () => {
    history.push('/');
  };

  if (data) {
    return (
      <>
        <h2>Plants Bookmarked</h2>
        <table style={{ border: '1px solid black', margin: '5px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '5px' }}>Id</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>
                Plants
              </th>
              <th style={{ border: '1px solid black', padding: '5px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((plant, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid black', padding: '5px' }}>
                  {plant.id}
                </td>
                <td style={{ border: '1px solid black', padding: '5px' }}>
                  {plant.name}
                </td>
                <td style={{ border: '1px solid black', padding: '5px' }}>
                  <button onClick={() => deleteItem(plant.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          variant='secondary'
          style={{ margin: '10px' }}
          onClick={toMainPage}
        >
          Back
        </Button>{' '}
      </>
    );
  } else {
    return <p>loading...</p>;
  }
};

export default UserPage;
