import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

const Playlist = (props) => {
  const {
    items
  } = props;

  const renderImage = (images) => {
    if (!images[0]) {
      return <TableCell></TableCell>;
    } else {
      return (
        <TableCell>
          <Avatar alt="" src={images[0].url}/>
        </TableCell>
      )
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Tracks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            return (
              <TableRow key={item.id}>
                {renderImage(item.images)}
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.owner.display_name}</TableCell>
                <TableCell>{item.tracks.total}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
};


export default Playlist;
