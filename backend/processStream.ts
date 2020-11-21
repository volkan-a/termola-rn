import shortid from "shortid";
import axios from "axios";
import {
  Density,
  MassFlow,
  Pressure,
  SpecificEnergy,
  SpecificEntropy,
  Temperature,
} from "unitsnet-js";

export enum THERMODYNAMIC_PROPERTIES {
  PRESSURE,
  TEMPERATURE,
  DENSITY,
  SPECIFIC_ENTHALPY,
  SPECIFIC_ENTROPY,
  VAPOR_FRACTION,
}

export const THERMODYNAMIC_PROPERTY_NAMES: string[] = [
  "Basınç",
  "Sıcaklık",
  "Yoğunluk",
  "Entalpi",
  "Entropi",
  "Kuruluk",
];

export enum MASS_FLOWRATE_UNITS {
  KILOGRAMS_PER_SECOND,
  KILOGRAMS_PER_HOUR,
  POUNDS_PER_SECOND,
  POUNDS_PER_HOUR,
}

export interface StreamInput {
  // name: string;
  massFlowrate: number;
  massFlowrateUnit: string;
  composition: { name: string; fraction: number }[];
  property1: THERMODYNAMIC_PROPERTIES;
  value1: number;
  unit1: string;
  property2: THERMODYNAMIC_PROPERTIES;
  value2: number;
  unit2: string;
}

export interface StreamResult {
  name: string;
  massFlowrate: number;
  composition: { name: string; fraction: number }[];
  pressure: number;
  temperature: number;
  density: number;
  specificEnthalpy: number;
  specificEntropy: number;
  vaporFraction: number;
}

export const DefaultInput: StreamInput = {
  // name: "Stream",
  massFlowrate: 1.0,
  composition: [{ name: "Water", fraction: 1.0 }],
  property1: THERMODYNAMIC_PROPERTIES.PRESSURE,
  value1: 1.0,
  unit1: "Atmospheres",
  property2: THERMODYNAMIC_PROPERTIES.TEMPERATURE,
  value2: 25.0,
  unit2: "Degrees",
  massFlowrateUnit: "KilogramsPerSecond",
};

export class ProcessStream {
  input: StreamInput;
  result: StreamResult | undefined;
  isCalculated = false;
  isDefined(): boolean {
    return !(this.input === undefined);
  }
  isFree = true;
  id = shortid.generate();
  name: string = this.id;

  constructor(input: StreamInput) {
    this.input = input;
  }

  async calculate() {
    let p1: string;
    let v1: number = this.input.value1;
    let p2: string;
    let v2: number = this.input.value2;
    let fn: string = "";
    if (this.input === undefined) {
      this.isCalculated = false;
      return;
    }
    this.input.composition.forEach((f) => (fn += `${f.name}[${f.fraction}]&`));
    fn = fn.slice(0, fn.length - 1);

    switch (this.input.unit1) {
      default:
        p1 = "";
        break;
      //Pressure
      case "Pascals":
        p1 = "P";
        break;
      case "KiloPascals":
        p1 = "P";
        v1 = Pressure.FromKilopascals(v1).Pascals;
        break;
      case "MegaPascals":
        p1 = "P";
        v1 = Pressure.FromMegapascals(v1).Pascals;
        break;
      case "Bars":
        p1 = "P";
        v1 = Pressure.FromBars(v1).Pascals;
        break;
      case "Atmospheres":
        p1 = "P";
        v1 = Pressure.FromAtmospheres(v1).Pascals;
        break;
      //Temperature
      case "Kelvins":
        p1 = "T";
        break;
      case "Degrees":
        p1 = "T";
        v1 = Temperature.FromDegreesCelsius(v1).Kelvins;
        break;
      case "Fahrenheits":
        p1 = "T";
        v1 = Temperature.FromDegreesFahrenheit(v1).Kelvins;
        break;
      case "Rankines":
        p1 = "T";
        v1 = Temperature.FromDegreesRankine(v1).Kelvins;
        break;
      //Density
      case "KilogramsPerCubicMeter":
        p1 = "D";
        break;
      case "PoundsPerCubicFoot":
        p1 = "D";
        v1 = Density.FromPoundsPerCubicFoot(v1).KilogramsPerCubicMeter;
        break;
      // Specific Enthalpy
      case "JoulesPerKilogram":
        p1 = "H";
        break;
      case "KiloJoulesPerKilogram":
        p1 = "H";
        v1 = SpecificEnergy.FromKilojoulesPerKilogram(v1).JoulesPerKilogram;
        break;
      case "BritishThermalUnitsPerPound":
        p1 = "H";
        v1 = SpecificEnergy.FromBtuPerPound(v1).JoulesPerKilogram;
        break;
      // Specific Entropy
      case "JoulesPerKilogramKelvin":
        p1 = "S";
        break;
      case "KiloJoulesPerKilogramKelvin":
        p1 = "S";
        v1 = SpecificEntropy.FromKilojoulesPerKilogramKelvin(v1)
          .JoulesPerKilogramKelvin;
        break;
      case "BritishThermalUnitsPerPoundFahrenheit":
        p1 = "S";
        v1 = SpecificEntropy.FromBtusPerPoundFahrenheit(v1)
          .JoulesPerKilogramKelvin;
        break;
      case "Fraction":
        p1 = "Q";
        break;
      case "PerCent":
        p1 = "Q";
        v1 = v1 / 100;
        break;
    }

    switch (this.input.unit2) {
      //Pressure
      default:
        p2 = "";
        break;
      case "Pascals":
        p2 = "P";
        break;
      case "KiloPascals":
        p2 = "P";
        v2 = Pressure.FromKilopascals(v2).Pascals;
        break;
      case "MegaPascals":
        p2 = "P";
        v2 = Pressure.FromMegapascals(v2).Pascals;
        break;
      case "Bars":
        p2 = "P";
        v2 = Pressure.FromBars(v2).Pascals;
        break;
      case "Atmospheres":
        p2 = "P";
        v2 = Pressure.FromAtmospheres(v2).Pascals;
        break;
      //Temperature
      case "Kelvins":
        p2 = "T";
        break;
      case "Degrees":
        p2 = "T";
        v2 = Temperature.FromDegreesCelsius(v2).Kelvins;
        break;
      case "Fahrenheits":
        p2 = "T";
        v2 = Temperature.FromDegreesFahrenheit(v2).Kelvins;
        break;
      case "Rankines":
        p2 = "T";
        v2 = Temperature.FromDegreesRankine(v2).Kelvins;
        break;
      //Density
      case "KilogramsPerCubicMeter":
        p2 = "D";
        break;
      case "PoundsPerCubicFoot":
        p2 = "D";
        v2 = Density.FromPoundsPerCubicFoot(v2).KilogramsPerCubicMeter;
        break;
      // Specific Enthalpy
      case "JoulesPerKilogram":
        p2 = "H";
        break;
      case "KiloJoulesPerKilogram":
        p2 = "H";
        v2 = SpecificEnergy.FromKilojoulesPerKilogram(v2).JoulesPerKilogram;
        break;
      case "BritishThermalUnitsPerPound":
        p2 = "H";
        v2 = SpecificEnergy.FromBtuPerPound(v2).JoulesPerKilogram;
        break;
      // Specific Entropy
      case "JoulesPerKilogramKelvin":
        p2 = "S";
        break;
      case "KiloJoulesPerKilogramKelvin":
        p2 = "S";
        v2 = SpecificEntropy.FromKilojoulesPerKilogramKelvin(v2)
          .JoulesPerKilogramKelvin;
        break;
      case "BritishThermalUnitsPerPoundFahrenheit":
        p2 = "S";
        v2 = SpecificEntropy.FromBtusPerPoundFahrenheit(v2)
          .JoulesPerKilogramKelvin;
        break;
      // Vapor Fraction
      // { key: "Fraction", text: "-" },
      // { key: "PerCent", text: "%" },
      case "Fraction":
        p2 = "Q";
        break;
      case "PerCent":
        p2 = "Q";
        v2 = v2 / 100;
        break;
    }

    this.result = {
      name: this.name,
      massFlowrate: this.massFlowSIConversion(),
      composition: this.input.composition,
      pressure: await this.get_from_api({ p: "P", p1, v1, p2, v2, f: fn }),
      temperature: await this.get_from_api({ p: "T", p1, v1, p2, v2, f: fn }),
      density: await this.get_from_api({ p: "D", p1, v1, p2, v2, f: fn }),
      specificEnthalpy: await this.get_from_api({
        p: "H",
        p1,
        v1,
        p2,
        v2,
        f: fn,
      }),
      specificEntropy: await this.get_from_api({
        p: "S",
        p1,
        v1,
        p2,
        v2,
        f: fn,
      }),
      vaporFraction: await this.get_from_api({ p: "Q", p1, v1, p2, v2, f: fn }),
    };
    if (
      !isFinite(this.result.temperature) ||
      !isFinite(this.result.pressure) ||
      !isFinite(this.result.specificEnthalpy) ||
      !isFinite(this.result.specificEntropy) ||
      !isFinite(this.result.vaporFraction)
    )
      this.isCalculated = false;
    else {
      this.isCalculated = true;
    }
  }

  private async get_from_api({
    p,
    p1,
    v1,
    p2,
    v2,
    f,
  }: {
    p: string;
    p1: string;
    v1: number;
    p2: string;
    v2: number;
    f: string;
  }) {
    try {
      const response = await axios.post(
        "https://propssiapp.azurewebsites.net/api/PyPropsSI?code=QEkV7KLzrU%2FMwXgi45zN15FWhEwHDFKygQFTmqwQ6ZVwbw2G7gutUQ%3D%3D",
        {
          p: p,
          p1: p1,
          v1: v1,
          p2: p2,
          v2: v2,
          f: f,
        },
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
      return response.data;
    } catch (error) {
      return Infinity;
    }
  }

  private massFlowSIConversion() {
    const m = this.input.massFlowrate;
    switch (this.input.massFlowrateUnit) {
      case "KilogramsPerSecond":
      default:
        return m;
      case "KilogramsPerHour":
        return MassFlow.FromKilogramsPerHour(m).KilogramsPerSecond;
      case "PoundsPerSecond":
        return MassFlow.FromPoundsPerSecond(m).KilogramsPerSecond;
      case "PoundsPerHour":
        return MassFlow.FromPoundsPerHour(m).KilogramsPerSecond;
    }
  }
}
