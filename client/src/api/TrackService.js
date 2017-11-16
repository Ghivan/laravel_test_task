import APIService from "./APIServiceCreator";
import Entities from './Entities';

const TracksService = new APIService(Entities.tracks);

export default TracksService;