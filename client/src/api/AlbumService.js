import APIService from "./APIServiceCreator";
import Entities from './Entities';

const AlbumService = new APIService(Entities.albums);

export default AlbumService;