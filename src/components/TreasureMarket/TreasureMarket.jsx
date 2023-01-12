import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useSelector, useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import Swal from 'sweetalert2';
import './TreasureMarket.css';

function TreasureMarket() {
    const dispatch = useDispatch();
    const store = useReduxStore();
    const userAwards = useSelector((store) => store.userAwards).map(award => award.awards_id);


    useEffect(() => {
        dispatch({ type: 'FETCH_POINTS', payload: { user_id: store.user.id } });
        dispatch({ type: 'FETCH_USER_ALL', payload: { user_id: store.user.id } });
        dispatch({ type: 'FETCH_LOVES_ALL' });
        dispatch({ type: 'FETCH_AWARDS' });
        dispatch({ type: 'FETCH_USER_AWARDS', payload: {user_id: store.user.id} });

    }, []);

    const points = Number(store.points[0]?.count) + Number(store.userAll?.filter(p => store.lovesAll?.includes(p)).length);
    console.log('store user awards', store.userAwards);
    const handleAwardClick = (id, awardName, description, path, points_required, points) => {
        Swal.fire({
            showCancelButton: true,
            imageUrl: path,
            showConfirmButton: (points >= points_required),
            title: awardName,
            html: `<i>${description}</i><br/>${`You need ${points_required} total points to get this treasure.`}`
        }).then((result) => {
            if (result.isConfirmed) {
              dispatch({type: 'ADD_AWARD', payload: {user_id: store.user.id, awards_id: id}});
            }
          })
    }

    return(
        <div id='treasure-market'>
            <BackButton/>
            <h2>Treasure Market</h2>
            <p>Welcome to the shop! Click an item below to view it.</p>
            <p>Choosing an item does not deduct from your point total.</p>
            <p>Your points: {points}</p>
            <div id='market-items'>
                {store.awards.filter(award => !userAwards?.includes(award.id)).map(award => {
                    return(
                    <div className='award' key={award.id}>
                        <img onClick={() => handleAwardClick(award.id, award.name, award.description, award.path, award.points_required, points)}src={award.path} />
                    </div>
                )})}
            </div>
        </div>
    );
}

export default TreasureMarket;