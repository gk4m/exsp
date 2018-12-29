import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CustomTable } from '@/components/customTable';
import {
  Exporter,
  ResourceType,
} from '@/services';

export class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
    };
  }

  componentWillMount() {
    const {
      fetchAlbums,
    } = this.props;

    fetchAlbums();
  }

  componentDidUpdate(prevProps) {
    const { albums } = this.props;
    const { albums: prevAlbums } = prevProps;

    if (!albums.isLoading && prevAlbums.isLoading && !albums.failure) {
      this.setState({
        items: [...albums.data.items.map(item => item.album)],
        loading: false,
      });
    }
  }

  handleExportClick = (selected) => {
    Exporter.doExport(selected, ResourceType.ALBUM);
  };

  renderLoading = () => {
    const style = {
      textAlign: 'center',
      margin: '15px',
    };

    return (
      <div style={style}>
        <CircularProgress color="secondary" />
      </div>
    );
  };

  renderError = () => (
    <div>
      {'I\'m sorry! Please try again.'}
    </div>
  );

  renderTable() {
    const {
      items,
    } = this.state;

    const {
      actionExport,
    } = this.props;

    const rows = [
      {
        id: 'image', numeric: false, disablePadding: false, label: 'Cover',
      },
      {
        id: 'name', numeric: false, disablePadding: false, label: 'Name',
      },
      {
        id: 'artists', numeric: false, disablePadding: false, label: 'Artists',
      },
      {
        id: 'tracks', numeric: true, disablePadding: false, label: 'Tracks',
      },
    ];

    return (
      <Fragment>
        <CustomTable
          title="Albums"
          headRows={rows}
          items={items}
          handleActionClick={this.handleExportClick}
          disableAction={actionExport.isLoading}
          renderBody={item => (
            <Fragment>
              <TableCell>
                {item.images[0] && <Avatar alt="" src={item.images[0].url} />}
              </TableCell>
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell>
                {item.artists.map((artist, index) => (index > 0
                  ? `${artist.name}, `
                  : artist.name))}
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

  render() {
    const {
      loading,
      items,
      e,
    } = this.state;

    const { isVisible } = this.props;

    if (isVisible) {
      if (loading) {
        return this.renderLoading();
      } if (items && items.length) {
        return this.renderTable();
      } if (e) {
        return this.renderError();
      }
      return (<p>There is no albums.</p>);
    }

    return null;
  }
}

Album.defaultProps = {
  isVisible: false,
};

Album.propTypes = {
  albums: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
  fetchAlbums: PropTypes.func.isRequired,
  actionExport: PropTypes.object.isRequired,
};
