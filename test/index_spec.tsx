import CounterComponent from "./counter";
import { mount, ReactWrapper, configure } from "enzyme";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("createReducerAction", () => {
  describe("counterComponent test", () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = mount(<CounterComponent />);
    });
    describe("when click increase button", () => {
      beforeEach(() => {
        wrapper.find(".increase").simulate("click");
      });
      it("should change count value to be increase", () => {
        expect(wrapper.find(".value").text()).toBe("1");
      });
    });
    describe("when click decrease button", () => {
      beforeEach(() => {
        wrapper.find(".decrease").simulate("click");
      });
      it("should change count value to be decrease", () => {
        expect(wrapper.find(".value").text()).toBe("-1");
      });
    });
    describe("when click reset button", () => {
      beforeEach(() => {
        wrapper.find(".decrease").simulate("click");
        wrapper.find(".decrease").simulate("click");
        wrapper.find(".reset").simulate("click");
      });
      it("should change count value to be decrease", () => {
        expect(wrapper.find(".value").text()).toBe("0");
      });
    });
    describe("when click toggleVisible button", () => {
      beforeEach(() => {
        wrapper.find(".toggleVisible").simulate("click");
      });
      it("should count value is be toggleVisible", () => {
        expect(wrapper.find(".value").text()).toBe("");
        expect(wrapper.find(".toggleVisible").text()).toBe("Show value");
      });
    });
    describe("when submit value form", () => {
      beforeEach(() => {
        wrapper.find("[name='value']").getDOMNode<HTMLInputElement>().value =
          "15";
        wrapper.find("form").simulate("submit");
      });
      it("should count value is be input value", () => {
        expect(wrapper.find(".value").text()).toBe("15");
      });
    });
  });
});
