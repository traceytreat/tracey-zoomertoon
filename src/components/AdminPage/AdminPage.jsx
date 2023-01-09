import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useReduxStore from '../../hooks/useReduxStore';
import { format, parseISO } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import './AdminPage.css';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../BackButton/BackButton';
function AdminPage() {
    const store = useReduxStore();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch({ type: 'FETCH_ADMIN_POSTS' });
        console.log('store is', store.post);
    }, []);

    const handleRemoveFlag = (posts_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will remove the flag from this post.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Unflag'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({type: 'REMOVE_FLAG', payload: {posts_id: posts_id, action: 'remove'}});
                console.log(posts_id);
                toast.success('The post was unflagged.');
            }
          })
    }

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
                toast.success('This post has been removed.');
            }
          })
    }

    return (
        <>
            <BackButton />
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
                                    {format(parseISO(row.date), 'MM/dd/yyyy hh:mm a')}
                                    </TableCell>
                                    <TableCell><Link to={row.reply_to ? `/details/${row.reply_to}` : `/details/${row.posts_id}`}>{row.path ? 'Drawing Post' : (row.reply_to ? 'Reply: ' + row.text : 'Text Post: ' + row.text)}</Link></TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell><button onClick={() => handleRemoveFlag(row.posts_id)}>Remove Flag</button><button onClick={() => handleDelete(row.posts_id)}>Delete</button></TableCell>
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