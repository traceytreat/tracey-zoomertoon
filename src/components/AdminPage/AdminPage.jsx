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
                                    <TableCell>Action buttons go here.</TableCell>
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