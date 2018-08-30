import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const Playlist = (props) => {
  const {
    items,
    handleExportClick,
    handleImportChange
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
      <Button
        onClick={handleExportClick}
        variant="contained"
        color="secondary"
        style={{marginTop: '10px', marginRight: '10px'}}
      >
        Export all
      </Button>

      <label htmlFor="import-file">
        <Button
          variant="contained"
          color="primary"
          component="span" style={{marginTop: '10px'}}>
          Upload
        </Button>
        <input
          accept=".json"
          onChange={handleImportChange}
          id="import-file"
          type="file"
          style={{display: 'none'}}
        />
      </label>

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
