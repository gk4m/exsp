import React, {Component, Fragment} from 'react';
import CustomTable from '../components/CustomTable'
import ExporterService from '../services/exporter'
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';

class AlbumContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      progress: 0,
    };
  }

  handleExportClick = (selected) => {
    ExporterService.exportAlbums(selected);
  };

  async componentWillMount() {
    const response = await ExporterService.fetchAlbums();

    this.setState({
      items: [...response.items.map(item => item.album)]
    });
  }

  render() {
    const {
      items,
    } = this.state;

    const rows = [
      {id: 'image', numeric: false, disablePadding: false, label: 'Cover'},
      {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
      {id: 'owner', numeric: false, disablePadding: false, label: 'Owner'},
      {id: 'tracks', numeric: true, disablePadding: false, label: 'Tracks'},
    ];

    return (
      <Fragment>
        <CustomTable
          headRows={rows}
          items={items}
          handleActionClick={this.handleExportClick}
          renderBody={(item)=> (
           <Fragment>
             <TableCell>
               {item.images[0] && <Avatar alt="" src={item.images[0].url}/>}
             </TableCell>
             <TableCell>
               {item.name}
             </TableCell>
             <TableCell>
               {item.artists.map((artist, index) => index > 0 ? `${artist.name},` : artist.name)}
             </TableCell>
             <TableCell numeric>
               {item.total_tracks}
             </TableCell>
           </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default AlbumContainer;
