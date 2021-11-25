import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const UserPage = () => {
  const { userId } = useParams();
  const history = useHistory();

  const baseURL = 'http://localhost:8080/api/v1/user';
  let urlParam = `?id=${userId}`;

  let url = baseURL + urlParam;

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        if (response === null) {
          setData({ plants: [{ id: '1111', name: 'Dummy Plant' }] });
        }
        setData(response.data);
      })
      .catch((err) => console.log(err.message));
  }, [url, baseURL]);

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
            </tr>
          </thead>
          <tbody>
            {data.plants.map((plant, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid black', padding: '5px' }}>
                  {plant.id}
                </td>
                <td style={{ border: '1px solid black', padding: '5px' }}>
                  {plant.name}
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
