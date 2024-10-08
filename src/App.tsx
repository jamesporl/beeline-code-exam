import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Button from './components/Button/Button';
import { User } from './types/user';
import Tag from './components/Tag/Tag';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    setIsLoading(true);
    setHasErrored(false);
    try {
      const resp = await axios.get('https://jsonplaceholder.typicode.com/users');
      const respData = resp.data;
      setUsers(respData);
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setHasErrored(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (showWarning) {
      const timeoutId = setTimeout(() => {
        setShowWarning(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [showWarning]);

  const deleteUsers = async () => {
    setUsers([]);
  }

  const handleClickGetUsers = useCallback(() => {
    if (users.length > 0) {
      setShowWarning(true);
    } else {
      getUsers();
    }
  }, [users]);

  let tableRows = (
    <tr>
      <td colSpan={6} align="center">
        <div>
          <img src="/loader.svg" alt="Loading" height={40} />
        </div>
        Loading...
      </td>
    </tr>
  );

  if (!isLoading) {
    if (hasErrored) {
      tableRows = (
        <tr>
          <td colSpan={6} align="center">
            Error fetching users.
          </td>
        </tr>
      );
    } else if (!users.length) {
      tableRows = (
        <tr>
          <td colSpan={6} align="center">
            No users found.
          </td>
        </tr>
      );
    } else {
      tableRows = (
        <>
          {users.map((u) => (
            <tr key={u.id}>
              <td align="center">{u.id}</td>
              <td>
                <strong>{u.name}</strong>
              </td>
              <td>
                <div className="with-icon">
                  <img src="/user.svg" alt="user" height={14} />
                  {u.username}
                </div>
                <div className="with-icon">
                  <img src="/mail.svg" alt="mail" height={14} />
                  {u.email}
                </div>
              </td>
              <td>
                <div className="with-icon">
                  <img src="/phone.svg" alt="phone" height={14} />
                  {u.phone}
                </div>
                <div className="with-icon">
                  <img src="/world.svg" alt="world" height={14} />
                  <a href={`https://${u.website}`} target="_blank">{u.website}</a>
                </div>
                <div className="with-icon address">
                  <img src="/map-pin.svg" alt="map-pin" height={14} />
                  <div>
                    <div>
                      {`${u.address.street}, ${u.address.suite}`}
                    </div>
                    <div>
                      {`${u.address.city} ${u.address.zipcode}`}
                    </div>
                    <div style={{ color: '#666' }}>
                      {`lat ${u.address.geo.lat}, long ${u.address.geo.lng}`}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ fontWeight: 500 }}>{u.company.name}</div>
                <div style={{ fontStyle: 'italic', color: '#666' }}>
                  {u.company.catchPhrase}
                </div>
                <div className="tags-container">
                  {u.company.bs.split(' ').map((bs) => <Tag text={bs} key={bs} />)}
                </div>
              </td>
            </tr>
          ))}
        </>
      );
    }
  }

  let warning = null;
  if (showWarning) {
    warning = (
      <div className="warning-container">
        <div className="warning">
          Kindly delete all users before refetching them.
        </div>
      </div>
    );
  }
  

  return (
    <>
      <div className="header">
        <img src="/beeline-logo.svg" alt="Beeline Logo" className="beeline-logo" height={40} />
      </div>
      <div className="content">
        <div className="header-2">
          <h1 className="title">Users</h1>
          {warning}
          <div className="actions">
            <Button
              color="blue"
              text="Get Users"
              onClick={handleClickGetUsers}
            />
            <Button color="red" text="Delete Users" onClick={deleteUsers} />
          </div>
        </div>
        <table className="table-users">
          <thead>
            <tr>
              <th align="center" style={{ width: '5%' }}>ID</th>
              <th align="left" style={{ width: '20%' }}>Name</th>
              <th align="left" style={{ width: '25%' }}>Credentials</th>
              <th align="left" style={{ width: '25%' }}>Contact</th>
              <th align="left" style={{ width: '25%' }}>Company</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App;
