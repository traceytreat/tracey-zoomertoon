import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useReduxStore from '../../hooks/useReduxStore';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import './AdminPage.css';
import { useHistory } from 'react-router-dom';

function AdminPage() {
    const store = useReduxStore();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch({ type: 'FETCH_ADMIN_POSTS' });
        console.log('store is', store.post);
    }, []);

    const handleDelete = (posts_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be reversed",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({type: 'DELETE_POST_ADMIN', payload: {posts_id: posts_id}});
                console.log(posts_id);
              Swal.fire(
                'Deleted!',
                'The post has been deleted.',
                'success'
              )
            }
          })
    }

    return (
        <>
            <div className="back-button">
                <div data-backbutton="Back to Main Feed">
                    <ArrowCircleLeftIcon style={{ fontSize: "72px", color: "white", cursor: "pointer" }} onClick={() => history.push('/feed')} />
                </div>
            </div>
            <div id="admin-page">

                <h2>Admin Dashboard</h2>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Post</TableCell>
                                <TableCell align="center">Posted by</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {store.post.map((row) => (
                                <TableRow
                                    key={row.posts_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell>{row.path ? 'Drawing Post' : (row.reply_to ? 'Reply: ' + row.text : 'Writing Post: ' + row.text)}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell><button onClick={() => handleDelete(row.posts_id)}>Delete</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default AdminPage;