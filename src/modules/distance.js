function PositionToDistance(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var r = 6371; //지구의 반지름(km)
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return r * c; // Distance in km
}

function getDistance(lat1, lng1, lat2, lng2) {
  var d = PositionToDistance(lat1, lng1, lat2, lng2);
  if (d.toFixed(1) < 1) {
    return <em>{Math.round(d * 1000)}m</em>;
  } else {
    return <em>{d.toFixed(1)}km</em>;
  }
}

function getDistanceTime(lat1, lng1, lat2, lng2) {
  var d = PositionToDistance(lat1, lng1, lat2, lng2);
  var walkkTime = ((d * 1000) / 67) | 0;
  var bycicleTime = ((d * 1000) / 227) | 0;
  var carTime = ((d * 1000) / 833.333) | 0;
  if (d.toFixed(1) < 1) {
    return (
      <div>
        <span className="distance">{Math.round(d * 1000)}m</span>
        <br />
        <span className="label">도보: </span>
        {walkkTime >= 60 && (
          <span className="number">{Math.floor(walkkTime / 60)} 시간</span>
        )}
        <span className="number"> {walkkTime % 60} 분</span>
        <br />
        <span className="label">자전거: </span>
        {bycicleTime >= 60 && (
          <span className="number">{Math.floor(bycicleTime / 60)} 시간</span>
        )}
        <span className="number"> {bycicleTime % 60} 분</span>
        <br />
        <span className="label">자동차: </span>
        {carTime >= 60 && (
          <span className="number">{Math.floor(carTime / 60)} 시간</span>
        )}
        <span className="number"> {carTime % 60} 분</span>
      </div>
    );
  } else {
    return (
      <div>
        <span>{d.toFixed(1)}km</span>
        <br />
        <span className="label">도보: </span>
        {walkkTime >= 60 && (
          <span className="number">{Math.floor(walkkTime / 60)} 시간</span>
        )}
        <span className="number"> {walkkTime % 60} 분</span>
        <br />
        <span className="label">자전거: </span>
        {bycicleTime >= 60 && (
          <span className="number">{Math.floor(bycicleTime / 60)} 시간</span>
        )}
        <span className="number"> {bycicleTime % 60} 분</span>
        <br />
        <span className="label">자동차: </span>
        {carTime >= 60 && (
          <span className="number">{Math.floor(carTime / 60)} 시간</span>
        )}
        <span className="number"> {carTime % 60} 분</span>
      </div>
    );
  }
}
export default { getDistance, getDistanceTime };
