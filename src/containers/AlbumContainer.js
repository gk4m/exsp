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

class AlbumContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
    };
  }

  handleExportClick = (selected) => {
    Exporter.doExport(selected, ResourceType.ALBUM);
  };

  async componentWillMount() {
    try {
      const response = await Repository.fetchAlbums();

      this.setState({
        items: [...response.items.map(item => item.album)],
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
    const style = {
      textAlign: "center",
      margin: "15px"
    };

    return (
      <div style={style}>
        <CircularProgress color="secondary" />
      </div>
    );
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
      {id: 'artists', numeric: false, disablePadding: false, label: 'Artists'},
      {id: 'tracks', numeric: true, disablePadding: false, label: 'Tracks'},
    ];

    return (
      <Fragment>
        <CustomTable
          title="Albums"
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
               {item.artists.map((artist, index) => index > 0
                 ? `${artist.name}, `
                 : artist.name)}
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

    if (loading) {
      return this.renderLoading();
    } else if (items && items.length) {
      return this.renderTable();
    } else if(e){
      return this.renderError();
    } else {
      return (<p>There is no albums.</p>)
    }
  }
}

export default AlbumContainer;
