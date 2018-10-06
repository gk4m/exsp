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

class ArtistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: true,
    };
  }

  handleExportClick = (selected) => {
    Exporter.doExport(selected, ResourceType.ARTIST);
  };

  async componentWillMount() {
    try {
      const response = await Repository.fetchArtists();

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
      {id: 'genres', numeric: false, disablePadding: false, label: 'Genres'},
      {id: 'followers', numeric: true, disablePadding: false, label: 'Followers'},
    ];

    return (
      <Fragment>
        <CustomTable
          title="Artists"
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
               {item.genres.map((genre, index) => index > 0
                 ? `${genre}, `
                 : genre)}
             </TableCell>
             <TableCell numeric>
               {item.followers.total}
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
      return (<p>There is no artists.</p>)
    }
  }
}

export default ArtistContainer;
