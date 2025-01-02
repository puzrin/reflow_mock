// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.5
//   protoc               v3.20.3
// source: types.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "";

export enum Constants {
  CONSTANT_UNSPECIFIED = 0,
  /** START_TEMPERATURE - Initial temperature for all profiles */
  START_TEMPERATURE = 30,
  /** MAX_REFLOW_PROFILES - Static sizes for repeated/maps */
  MAX_REFLOW_PROFILES = 10,
  MAX_REFLOW_SEGMENTS = 10,
  MAX_HISTORY_CHUNK = 100,
  /** HISTORY_ID_SENSOR_BAKE_MODE - History IDs for tasks (selected to not conflict with profile IDs) */
  HISTORY_ID_SENSOR_BAKE_MODE = 4000,
  HISTORY_ID_ADRC_TEST_MODE = 4001,
  HISTORY_ID_STEP_RESPONSE = 4002,
  UNRECOGNIZED = -1,
}

export function constantsFromJSON(object: any): Constants {
  switch (object) {
    case 0:
    case "CONSTANT_UNSPECIFIED":
      return Constants.CONSTANT_UNSPECIFIED;
    case 30:
    case "START_TEMPERATURE":
      return Constants.START_TEMPERATURE;
    case 10:
    case "MAX_REFLOW_PROFILES":
      return Constants.MAX_REFLOW_PROFILES;
    case 10:
    case "MAX_REFLOW_SEGMENTS":
      return Constants.MAX_REFLOW_SEGMENTS;
    case 100:
    case "MAX_HISTORY_CHUNK":
      return Constants.MAX_HISTORY_CHUNK;
    case 4000:
    case "HISTORY_ID_SENSOR_BAKE_MODE":
      return Constants.HISTORY_ID_SENSOR_BAKE_MODE;
    case 4001:
    case "HISTORY_ID_ADRC_TEST_MODE":
      return Constants.HISTORY_ID_ADRC_TEST_MODE;
    case 4002:
    case "HISTORY_ID_STEP_RESPONSE":
      return Constants.HISTORY_ID_STEP_RESPONSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Constants.UNRECOGNIZED;
  }
}

export function constantsToJSON(object: Constants): string {
  switch (object) {
    case Constants.CONSTANT_UNSPECIFIED:
      return "CONSTANT_UNSPECIFIED";
    case Constants.START_TEMPERATURE:
      return "START_TEMPERATURE";
    case Constants.MAX_REFLOW_PROFILES:
      return "MAX_REFLOW_PROFILES";
    case Constants.MAX_REFLOW_SEGMENTS:
      return "MAX_REFLOW_SEGMENTS";
    case Constants.MAX_HISTORY_CHUNK:
      return "MAX_HISTORY_CHUNK";
    case Constants.HISTORY_ID_SENSOR_BAKE_MODE:
      return "HISTORY_ID_SENSOR_BAKE_MODE";
    case Constants.HISTORY_ID_ADRC_TEST_MODE:
      return "HISTORY_ID_ADRC_TEST_MODE";
    case Constants.HISTORY_ID_STEP_RESPONSE:
      return "HISTORY_ID_STEP_RESPONSE";
    case Constants.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum DeviceState {
  Init = 0,
  Idle = 1,
  Reflow = 2,
  SensorBake = 3,
  AdrcTest = 4,
  StepResponse = 5,
  Bonding = 6,
  NumberOfStates = 7,
  UNRECOGNIZED = -1,
}

export function deviceStateFromJSON(object: any): DeviceState {
  switch (object) {
    case 0:
    case "Init":
      return DeviceState.Init;
    case 1:
    case "Idle":
      return DeviceState.Idle;
    case 2:
    case "Reflow":
      return DeviceState.Reflow;
    case 3:
    case "SensorBake":
      return DeviceState.SensorBake;
    case 4:
    case "AdrcTest":
      return DeviceState.AdrcTest;
    case 5:
    case "StepResponse":
      return DeviceState.StepResponse;
    case 6:
    case "Bonding":
      return DeviceState.Bonding;
    case 7:
    case "NumberOfStates":
      return DeviceState.NumberOfStates;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DeviceState.UNRECOGNIZED;
  }
}

export function deviceStateToJSON(object: DeviceState): string {
  switch (object) {
    case DeviceState.Init:
      return "Init";
    case DeviceState.Idle:
      return "Idle";
    case DeviceState.Reflow:
      return "Reflow";
    case DeviceState.SensorBake:
      return "SensorBake";
    case DeviceState.AdrcTest:
      return "AdrcTest";
    case DeviceState.StepResponse:
      return "StepResponse";
    case DeviceState.Bonding:
      return "Bonding";
    case DeviceState.NumberOfStates:
      return "NumberOfStates";
    case DeviceState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface DeviceStatus {
  /** Main */
  state: DeviceState;
  hotplate_connected: boolean;
  hotplate_id: number;
  temperature: number;
  /** Debug info */
  watts: number;
  volts: number;
  amperes: number;
  max_watts: number;
  /** 0..1 */
  duty_cycle: number;
}

export interface Segment {
  /** Target temperature in Celsius */
  target: number;
  /** Duration in seconds */
  duration: number;
}

export interface Profile {
  /** Unique profile identifier */
  id: number;
  /** Profile name */
  name: string;
  /** Temperature segments sequence */
  segments: Segment[];
}

export interface ProfilesData {
  /** Available profiles */
  items: Profile[];
  /** Currently selected profile id */
  selectedId: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface HistoryChunk {
  type: number;
  version: number;
  data: Point[];
}

export interface AdrcParams {
  /** System response time (when temperature reaches 63% of final value) */
  response: number;
  /** Scale. Max derivative / power */
  b0: number;
  /**
   * ω_observer = N / τ. Usually 3..10
   * 5 is good for the start. Increase until oscillates, then back 10-20%.
   */
  N: number;
  /**
   * ω_controller = ω_observer / M. Usually 2..5
   * 3 is a good for the start. Probably, changes not required.
   */
  M: number;
}

export interface SensorParams {
  p0_temperature: number;
  p0_value: number;
  p1_temperature: number;
  p1_value: number;
}

function createBaseDeviceStatus(): DeviceStatus {
  return {
    state: 0,
    hotplate_connected: false,
    hotplate_id: 0,
    temperature: 0,
    watts: 0,
    volts: 0,
    amperes: 0,
    max_watts: 0,
    duty_cycle: 0,
  };
}

export const DeviceStatus: MessageFns<DeviceStatus> = {
  encode(message: DeviceStatus, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.hotplate_connected !== false) {
      writer.uint32(16).bool(message.hotplate_connected);
    }
    if (message.hotplate_id !== 0) {
      writer.uint32(24).uint32(message.hotplate_id);
    }
    if (message.temperature !== 0) {
      writer.uint32(37).float(message.temperature);
    }
    if (message.watts !== 0) {
      writer.uint32(45).float(message.watts);
    }
    if (message.volts !== 0) {
      writer.uint32(53).float(message.volts);
    }
    if (message.amperes !== 0) {
      writer.uint32(61).float(message.amperes);
    }
    if (message.max_watts !== 0) {
      writer.uint32(69).float(message.max_watts);
    }
    if (message.duty_cycle !== 0) {
      writer.uint32(77).float(message.duty_cycle);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeviceStatus {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.hotplate_connected = reader.bool();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.hotplate_id = reader.uint32();
          continue;
        }
        case 4: {
          if (tag !== 37) {
            break;
          }

          message.temperature = reader.float();
          continue;
        }
        case 5: {
          if (tag !== 45) {
            break;
          }

          message.watts = reader.float();
          continue;
        }
        case 6: {
          if (tag !== 53) {
            break;
          }

          message.volts = reader.float();
          continue;
        }
        case 7: {
          if (tag !== 61) {
            break;
          }

          message.amperes = reader.float();
          continue;
        }
        case 8: {
          if (tag !== 69) {
            break;
          }

          message.max_watts = reader.float();
          continue;
        }
        case 9: {
          if (tag !== 77) {
            break;
          }

          message.duty_cycle = reader.float();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceStatus {
    return {
      state: isSet(object.state) ? deviceStateFromJSON(object.state) : 0,
      hotplate_connected: isSet(object.hotplate_connected) ? globalThis.Boolean(object.hotplate_connected) : false,
      hotplate_id: isSet(object.hotplate_id) ? globalThis.Number(object.hotplate_id) : 0,
      temperature: isSet(object.temperature) ? globalThis.Number(object.temperature) : 0,
      watts: isSet(object.watts) ? globalThis.Number(object.watts) : 0,
      volts: isSet(object.volts) ? globalThis.Number(object.volts) : 0,
      amperes: isSet(object.amperes) ? globalThis.Number(object.amperes) : 0,
      max_watts: isSet(object.max_watts) ? globalThis.Number(object.max_watts) : 0,
      duty_cycle: isSet(object.duty_cycle) ? globalThis.Number(object.duty_cycle) : 0,
    };
  },

  toJSON(message: DeviceStatus): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = deviceStateToJSON(message.state);
    }
    if (message.hotplate_connected !== false) {
      obj.hotplate_connected = message.hotplate_connected;
    }
    if (message.hotplate_id !== 0) {
      obj.hotplate_id = Math.round(message.hotplate_id);
    }
    if (message.temperature !== 0) {
      obj.temperature = message.temperature;
    }
    if (message.watts !== 0) {
      obj.watts = message.watts;
    }
    if (message.volts !== 0) {
      obj.volts = message.volts;
    }
    if (message.amperes !== 0) {
      obj.amperes = message.amperes;
    }
    if (message.max_watts !== 0) {
      obj.max_watts = message.max_watts;
    }
    if (message.duty_cycle !== 0) {
      obj.duty_cycle = message.duty_cycle;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceStatus>, I>>(base?: I): DeviceStatus {
    return DeviceStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceStatus>, I>>(object: I): DeviceStatus {
    const message = createBaseDeviceStatus();
    message.state = object.state ?? 0;
    message.hotplate_connected = object.hotplate_connected ?? false;
    message.hotplate_id = object.hotplate_id ?? 0;
    message.temperature = object.temperature ?? 0;
    message.watts = object.watts ?? 0;
    message.volts = object.volts ?? 0;
    message.amperes = object.amperes ?? 0;
    message.max_watts = object.max_watts ?? 0;
    message.duty_cycle = object.duty_cycle ?? 0;
    return message;
  },
};

function createBaseSegment(): Segment {
  return { target: 0, duration: 0 };
}

export const Segment: MessageFns<Segment> = {
  encode(message: Segment, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.target !== 0) {
      writer.uint32(8).int32(message.target);
    }
    if (message.duration !== 0) {
      writer.uint32(16).int32(message.duration);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Segment {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSegment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.target = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.duration = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Segment {
    return {
      target: isSet(object.target) ? globalThis.Number(object.target) : 0,
      duration: isSet(object.duration) ? globalThis.Number(object.duration) : 0,
    };
  },

  toJSON(message: Segment): unknown {
    const obj: any = {};
    if (message.target !== 0) {
      obj.target = Math.round(message.target);
    }
    if (message.duration !== 0) {
      obj.duration = Math.round(message.duration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Segment>, I>>(base?: I): Segment {
    return Segment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Segment>, I>>(object: I): Segment {
    const message = createBaseSegment();
    message.target = object.target ?? 0;
    message.duration = object.duration ?? 0;
    return message;
  },
};

function createBaseProfile(): Profile {
  return { id: 0, name: "", segments: [] };
}

export const Profile: MessageFns<Profile> = {
  encode(message: Profile, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.segments) {
      Segment.encode(v!, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Profile {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.segments.push(Segment.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Profile {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      segments: globalThis.Array.isArray(object?.segments) ? object.segments.map((e: any) => Segment.fromJSON(e)) : [],
    };
  },

  toJSON(message: Profile): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.segments?.length) {
      obj.segments = message.segments.map((e) => Segment.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Profile>, I>>(base?: I): Profile {
    return Profile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Profile>, I>>(object: I): Profile {
    const message = createBaseProfile();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.segments = object.segments?.map((e) => Segment.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProfilesData(): ProfilesData {
  return { items: [], selectedId: 0 };
}

export const ProfilesData: MessageFns<ProfilesData> = {
  encode(message: ProfilesData, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.items) {
      Profile.encode(v!, writer.uint32(10).fork()).join();
    }
    if (message.selectedId !== 0) {
      writer.uint32(16).int32(message.selectedId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProfilesData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfilesData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.items.push(Profile.decode(reader, reader.uint32()));
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.selectedId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProfilesData {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Profile.fromJSON(e)) : [],
      selectedId: isSet(object.selectedId) ? globalThis.Number(object.selectedId) : 0,
    };
  },

  toJSON(message: ProfilesData): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Profile.toJSON(e));
    }
    if (message.selectedId !== 0) {
      obj.selectedId = Math.round(message.selectedId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProfilesData>, I>>(base?: I): ProfilesData {
    return ProfilesData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProfilesData>, I>>(object: I): ProfilesData {
    const message = createBaseProfilesData();
    message.items = object.items?.map((e) => Profile.fromPartial(e)) || [];
    message.selectedId = object.selectedId ?? 0;
    return message;
  },
};

function createBasePoint(): Point {
  return { x: 0, y: 0 };
}

export const Point: MessageFns<Point> = {
  encode(message: Point, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Point {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 13) {
            break;
          }

          message.x = reader.float();
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }

          message.y = reader.float();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Point {
    return {
      x: isSet(object.x) ? globalThis.Number(object.x) : 0,
      y: isSet(object.y) ? globalThis.Number(object.y) : 0,
    };
  },

  toJSON(message: Point): unknown {
    const obj: any = {};
    if (message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== 0) {
      obj.y = message.y;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Point>, I>>(base?: I): Point {
    return Point.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Point>, I>>(object: I): Point {
    const message = createBasePoint();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

function createBaseHistoryChunk(): HistoryChunk {
  return { type: 0, version: 0, data: [] };
}

export const HistoryChunk: MessageFns<HistoryChunk> = {
  encode(message: HistoryChunk, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.version !== 0) {
      writer.uint32(16).int32(message.version);
    }
    for (const v of message.data) {
      Point.encode(v!, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HistoryChunk {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoryChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.version = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.data.push(Point.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoryChunk {
    return {
      type: isSet(object.type) ? globalThis.Number(object.type) : 0,
      version: isSet(object.version) ? globalThis.Number(object.version) : 0,
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Point.fromJSON(e)) : [],
    };
  },

  toJSON(message: HistoryChunk): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = Math.round(message.type);
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.data?.length) {
      obj.data = message.data.map((e) => Point.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoryChunk>, I>>(base?: I): HistoryChunk {
    return HistoryChunk.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoryChunk>, I>>(object: I): HistoryChunk {
    const message = createBaseHistoryChunk();
    message.type = object.type ?? 0;
    message.version = object.version ?? 0;
    message.data = object.data?.map((e) => Point.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAdrcParams(): AdrcParams {
  return { response: 0, b0: 0, N: 0, M: 0 };
}

export const AdrcParams: MessageFns<AdrcParams> = {
  encode(message: AdrcParams, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.response !== 0) {
      writer.uint32(13).float(message.response);
    }
    if (message.b0 !== 0) {
      writer.uint32(21).float(message.b0);
    }
    if (message.N !== 0) {
      writer.uint32(29).float(message.N);
    }
    if (message.M !== 0) {
      writer.uint32(37).float(message.M);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): AdrcParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdrcParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 13) {
            break;
          }

          message.response = reader.float();
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }

          message.b0 = reader.float();
          continue;
        }
        case 3: {
          if (tag !== 29) {
            break;
          }

          message.N = reader.float();
          continue;
        }
        case 4: {
          if (tag !== 37) {
            break;
          }

          message.M = reader.float();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AdrcParams {
    return {
      response: isSet(object.response) ? globalThis.Number(object.response) : 0,
      b0: isSet(object.b0) ? globalThis.Number(object.b0) : 0,
      N: isSet(object.N) ? globalThis.Number(object.N) : 0,
      M: isSet(object.M) ? globalThis.Number(object.M) : 0,
    };
  },

  toJSON(message: AdrcParams): unknown {
    const obj: any = {};
    if (message.response !== 0) {
      obj.response = message.response;
    }
    if (message.b0 !== 0) {
      obj.b0 = message.b0;
    }
    if (message.N !== 0) {
      obj.N = message.N;
    }
    if (message.M !== 0) {
      obj.M = message.M;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AdrcParams>, I>>(base?: I): AdrcParams {
    return AdrcParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AdrcParams>, I>>(object: I): AdrcParams {
    const message = createBaseAdrcParams();
    message.response = object.response ?? 0;
    message.b0 = object.b0 ?? 0;
    message.N = object.N ?? 0;
    message.M = object.M ?? 0;
    return message;
  },
};

function createBaseSensorParams(): SensorParams {
  return { p0_temperature: 0, p0_value: 0, p1_temperature: 0, p1_value: 0 };
}

export const SensorParams: MessageFns<SensorParams> = {
  encode(message: SensorParams, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.p0_temperature !== 0) {
      writer.uint32(13).float(message.p0_temperature);
    }
    if (message.p0_value !== 0) {
      writer.uint32(21).float(message.p0_value);
    }
    if (message.p1_temperature !== 0) {
      writer.uint32(29).float(message.p1_temperature);
    }
    if (message.p1_value !== 0) {
      writer.uint32(37).float(message.p1_value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SensorParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSensorParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 13) {
            break;
          }

          message.p0_temperature = reader.float();
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }

          message.p0_value = reader.float();
          continue;
        }
        case 3: {
          if (tag !== 29) {
            break;
          }

          message.p1_temperature = reader.float();
          continue;
        }
        case 4: {
          if (tag !== 37) {
            break;
          }

          message.p1_value = reader.float();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SensorParams {
    return {
      p0_temperature: isSet(object.p0_temperature) ? globalThis.Number(object.p0_temperature) : 0,
      p0_value: isSet(object.p0_value) ? globalThis.Number(object.p0_value) : 0,
      p1_temperature: isSet(object.p1_temperature) ? globalThis.Number(object.p1_temperature) : 0,
      p1_value: isSet(object.p1_value) ? globalThis.Number(object.p1_value) : 0,
    };
  },

  toJSON(message: SensorParams): unknown {
    const obj: any = {};
    if (message.p0_temperature !== 0) {
      obj.p0_temperature = message.p0_temperature;
    }
    if (message.p0_value !== 0) {
      obj.p0_value = message.p0_value;
    }
    if (message.p1_temperature !== 0) {
      obj.p1_temperature = message.p1_temperature;
    }
    if (message.p1_value !== 0) {
      obj.p1_value = message.p1_value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SensorParams>, I>>(base?: I): SensorParams {
    return SensorParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SensorParams>, I>>(object: I): SensorParams {
    const message = createBaseSensorParams();
    message.p0_temperature = object.p0_temperature ?? 0;
    message.p0_value = object.p0_value ?? 0;
    message.p1_temperature = object.p1_temperature ?? 0;
    message.p1_value = object.p1_value ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
