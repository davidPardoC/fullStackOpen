import { Table, TableContainer, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <>
      <h3>Users</h3>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Users</Th>
              <Th>Blogs Created</Th>
            </Tr>
          </Thead>
          <tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>
                  <Link to={`/users/${user._id}`}>{user.name}</Link>
                </Td>
                <Td>{user.blogs.length}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
