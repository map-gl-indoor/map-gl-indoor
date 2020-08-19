import Indoor from './Indoor';
import IndoorControl from './IndoorControl';
import IndoorMap from './IndoorMap';
import IndoorStyle from './style';

if (typeof window !== 'undefined' && window.mapboxgl) {
    Object.assign(window.mapboxgl, { Indoor, IndoorControl, IndoorMap, IndoorStyle });
}

export { Indoor, IndoorControl, IndoorMap, IndoorStyle };
