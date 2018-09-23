import React, {Component, Fragment} from 'react';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
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
      loading: true,
    };
  }

  handleExportClick = (selected) => {
    Exporter.doExport(selected, ResourceType.PLAYLIST);
  };

  async componentWillMount() {
    try {
      const response = await Repository.fetchPlaylists();

      this.setState({
        items: [...response.items],
        loading: false,
      });

    } catch (e) {
      this.setState({
        loading: false,
        e
      });
    }
  }

  renderLoading() {
    return <div style={{textAlign: "center", margin: "15px"}}><CircularProgress  color="secondary" /></div>;
  }

  renderError() {
    return <div>I'm sorry! Please try again.</div>;
  }

  renderTable() {
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

  render() {
    const {
      loading,
      items,
    } = this.state;

    if (loading) {
      return this.renderLoading();
    } else if (items && items.length) {
      return this.renderTable();
    } else {
      return this.renderError();
    }
  }
}

export default PlaylistContainer;
