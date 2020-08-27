import carTableMock from "./carTableMock";
import MockUtils from "./mock.utils";

export default function mockKundalis(mock) {
  mock.onPost("api/kundalis").reply(({ data }) => {
    const { kundali } = JSON.parse(data);
    const {
      model = "",
      manufacture = "",
      modelYear = 2000,
      mileage = 0,
      description = "",
      color = "Black",
      price = 1000,
      condition = 0,
      status = 0,
      VINCode = ""
    } = kundali;

    const id = generateKundaliId();
    const newKundali = {
      id,
      model,
      manufacture,
      modelYear,
      mileage,
      description,
      color,
      price,
      condition,
      status,
      VINCode
    };
    carTableMock.push(newKundali);
    return [200, { kundali: newKundali }];
  });

  mock.onPost("api/kundalis/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredKundalis = mockUtils.baseFilter(carTableMock, queryParams);
    return [200, filteredKundalis];
  });

  mock.onPost("api/kundalis/deleteKundalis").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = carTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        carTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/kundalis/updateStatusForKundalis").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    carTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/kundalis\/\d+/).reply(config => {
    const id = config.url.match(/api\/kundalis\/(\d+)/)[1];
    const kundali = carTableMock.find(el => el.id === +id);
    if (!kundali) {
      return [400];
    }

    return [200, kundali];
  });

  mock.onPut(/api\/kundalis\/\d+/).reply(config => {
    const id = config.url.match(/api\/kundalis\/(\d+)/)[1];
    const { kundali } = JSON.parse(config.data);
    const index = carTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    carTableMock[index] = { ...kundali };
    return [200];
  });

  mock.onDelete(/api\/kundalis\/\d+/).reply(config => {
    const id = config.url.match(/api\/kundalis\/(\d+)/)[1];
    const index = carTableMock.findIndex(el => el.id === +id);
    carTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateKundaliId() {
  const ids = carTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}