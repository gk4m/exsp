import React, {Component, Fragment} from 'react';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import CustomTable from '../components/CustomTable'

import {
  Repository,
  Exporter,
  ResourceType
} from '../services'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      progress: 0,
    };
  }

  handleExportClick = (selected) => {
    Exporter.doExport(selected, ResourceType.PLAYLIST);
  };

  async componentWillMount() {
    const response = await Repository.fetchPlaylists();

    this.setState({
      items: [...response.items]
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
          title="Playlists"
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
              <TableCell>{item.owner.display_name}</TableCell>
              <TableCell numeric>{item.tracks.total}</TableCell>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default PlaylistContainer;
