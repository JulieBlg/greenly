import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  describe("Classic Partner", () => {
    it("should decrease the discount by one and expiresIn before expiration date", () => {
      expect(
        new Store([
          new DiscountOffer("Classic Partner", 2, 3)
        ]).updateDiscounts()
      ).toEqual([new DiscountOffer("Classic Partner", 1, 2)]);
    });

    it("should decrease the discount by two and expiresIn after expiration date", () => {
      expect(
        new Store([
          new DiscountOffer("Classic Partner", 0, 4)
        ]).updateDiscounts()
      ).toEqual([new DiscountOffer("Classic Partner", -1, 2)]);
    });
  });

  describe("Ilek", () => {
    it("should keep the same discount and expiresIn", () => {
      expect(
        new Store([new DiscountOffer("Ilek", 2, 3)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Ilek", 2, 3)]);
    });
  });

  describe("BackMarket", () => {
    it("should decrease the discount by two and expiresIn before expiration date", () => {
      expect(
        new Store([new DiscountOffer("BackMarket", 2, 10)]).updateDiscounts()
      ).toEqual([new DiscountOffer("BackMarket", 1, 8)]);
    });

    it("should decrease the discount by four and expiresIn before expiration date", () => {
      expect(
        new Store([new DiscountOffer("BackMarket", 0, 10)]).updateDiscounts()
      ).toEqual([new DiscountOffer("BackMarket", -1, 6)]);
    });
  });

  describe("Vinted", () => {
    it("should increase the discount by one and expiresIn 20 days before expiration date", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 20, 40)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", 19, 41)]);
    });

    it("should increase the discount by two and expiresIn 9 days before expiration date", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 9, 40)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", 8, 42)]);
    });

    it("should increase the discount by three and expiresIn 5 days before expiration date", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 5, 40)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", 4, 43)]);
    });

    it("should have a null discount after expiration date", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 0, 40)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", -1, 0)]);
    });

    it("should not have a discount over 50 when it should increase by two", () => {
      expect(
        new Store([new DiscountOffer("Vinted", 4, 49)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Vinted", 3, 50)]);
    });
  });

  describe("Naturalia", () => {
    it("should increase the discount by two and expiresIn before expiration date", () => {
      expect(
        new Store([new DiscountOffer("Naturalia", 2, 10)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Naturalia", 1, 11)]);
    });

    it("should increase the discount by two and expiresIn before expiration date", () => {
      expect(
        new Store([new DiscountOffer("Naturalia", 0, 10)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Naturalia", -1, 12)]);
    });

    it("should not have a discount over 50 when it should increase by one", () => {
      expect(
        new Store([new DiscountOffer("Naturalia", 4, 50)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Naturalia", 3, 50)]);
    });
  });
});
