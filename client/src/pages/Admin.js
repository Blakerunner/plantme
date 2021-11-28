import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Admin = ({ isAdmin, token }) => {
  const REACT_APP_SERVER_URL =
    process.env.REACT_APP_SERVER_URL || 'https://plantme.blakerunner.com';

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_SERVER_URL}/api/v1/admin/endpointStats`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(data.data.stats);
      } catch (err) {
        console.log(err);
      }
    };
    if (isAdmin) fetchData();
  }, [token, REACT_APP_SERVER_URL, isAdmin]);

  return (
    <>
      <div className='container flex-auto text-center my-2'>
        {isAdmin ? (
          <>
            <h2>Admin Panel</h2>
            <Table border hover>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Endpoint</th>
                  <th>Requests</th>
                </tr>
              </thead>
              <tbody>
                {stats &&
                  stats.map((stat, idx) => (
                    <tr key={idx}>
                      <td>{stat.method}</td>
                      <td>{stat.endpoint}</td>
                      <td>{stat.requests}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <p className='h2'>You are unauthorized.</p>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
