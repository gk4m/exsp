import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CustomTable} from '@/components/customTable'

import {
  Exporter,
  ResourceType
} from '@/services';

export class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { playlists } = this.props;
    const { playlists: prevPlaylist } = prevProps;

    if (!playlists.isLoading && prevPlaylist.isLoading && !playlists.failure) {
      this.setState({
        items: [...playlists.data.items],
        loading: false,
      });
    }
  }

  componentWillMount() {
    const {
      fetchPlaylists,
    } = this.props;

    fetchPlaylists();
  }

  handleExportClick = (selected) => {
    Exporter.doExport(selected, ResourceType.PLAYLIST);
  };

  renderLoading = () => {
    const style = {
      textAlign: "center",
      margin: "15px"
    };

    return (
      <div style={style}>
        <CircularProgress color="secondary" />
      </div>
    );
  };

  renderError = () => {
    return <div>I'm sorry! Please try again.</div>;
  };

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
      e,
    } = this.state;

    if (loading) {
      return this.renderLoading();
    } else if (items && items.length) {
      return this.renderTable();
    } else if(e){
      return this.renderError();
    } else {
      return (<p>There is no playlists.</p>)
    }
  }
}

Playlist.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
};
