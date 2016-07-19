/**
 * Created by zhaofeng on 7/16/16.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {play, playAll, add, clear} from '../actions/common';
import toastr from 'toastr';

const mapStateToProps = state => ({
    common: state.common
});

const mapDispatchToProps = (dispatch) => ({
    action: bindActionCreators({
        add,
        play,
        playAll,
        clear
    }, dispatch),
    dispatch
});
export default class PlayTable extends Component {
    constructor(props) {
        super(props);
    }

    play(index) {
        this.props.action.play(index);
    }

    add(song) {
        this.props.action.add({
            id: song.ID,
            type: song.SK,
            name: song.SN,
            singer: song.user.NN,
            singerId: song.user.ID,
            singerImg: song.user.I
        });
        toastr.success('添加成功');
    }

    clear(songId, index) {
        if (index == this.props.common.current) return;

        this.props.action.clear(songId, index);
    }

    render() {
        let songs = this.props.songs || [],
            current = this.props.common.current;

        return (
            <table className="table table-elsa">
                <tbody>
                {songs && songs.map((song, index) => {
                    return (
                        <tr key={song.ID}>
                            <td className="center light-color no-wrap">
                                <Link to={`/user/${song.user.ID}`}>
                                    <img className="pointer"
                                         src={song.user.I}
                                         style={{width: '50px !important', height: '50px !important'}}/>
                                </Link>
                            </td>
                            <td className={`no-wrap highlight-normal relative ${current == index ? 'playing' : ''}`}>
                                <span className="song-name no-wrap">{song.SN}</span>
                                <span className="singer-name no-wrap light-color pointer">
                                    <Link to={`/user/${song.user.ID}`}>{song.user.NN}</Link>
                                </span>
                                <span className="btn-group menu-bar">
                                    <i className="btn fa fa-play"
                                       onClick={this.play.bind(this, index)}/>
                                    <i className="btn fa fa-download"/>
                                    <i className={`btn fa fa-close ${current == index ? 'disabled' : ''}`}
                                       onClick={this.clear.bind(this, song.ID, index)}/>
                                </span>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayTable);