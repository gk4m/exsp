import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { msToMinutes } from '@/utils';
import { CustomTable } from '@/components/customTable';
import {
  Exporter,
  ResourceType,
} from '@/services';

export class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
    };
  }

  async componentWillMount() {
    const {
      fetchSongs,
    } = this.props;

    fetchSongs();
  }

  componentDidUpdate(prevProps) {
    const { songs } = this.props;
    const { songs: prevSongs } = prevProps;

    if (!songs.isLoading && prevSongs.isLoading && !songs.failure) {
      this.setState({
        items: [...songs.data.items.map(item => item.track)],
        loading: false,
      });
    }
  }

  handleExportClick = (selected) => {
    Exporter.doExport(selected, ResourceType.SONG);
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
        id: 'name', numeric: false, disablePadding: false, label: 'Title',
      },
      {
        id: 'artists', numeric: false, disablePadding: false, label: 'Artist',
      },
      {
        id: 'album', numeric: false, disablePadding: false, label: 'Album',
      },
      {
        id: 'duration_ms', numeric: true, disablePadding: false, label: 'Time',
      },
    ];

    return (
      <Fragment>
        <CustomTable
          headRows={rows}
          items={items}
          handleActionClick={this.handleExportClick}
          disableAction={actionExport.isLoading}
          renderBody={item => (
            <Fragment>
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell>
                {item.artists.map((artist, index) => (index > 0
                  ? `${artist.name}, `
                  : artist.name))}
              </TableCell>
              <TableCell>
                {item.album.name}
              </TableCell>
              <TableCell numeric>
                {msToMinutes(item.duration_ms)}
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
      return (<p className="text-align-center">There is no songs.</p>);
    }

    return null;
  }
}

Song.defaultProps = {
  isVisible: false,
};

Song.propTypes = {
  songs: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
  fetchSongs: PropTypes.func.isRequired,
  actionExport: PropTypes.object.isRequired,
};
