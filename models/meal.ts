class Meal {
  constructor(
    public id: string,
    public categoryIds: string[],
    public title: string,
    public author: string,
    public affordability: string,
    public complexity: string,
    public imageUrl: string,
    public duration: number,
    public ingredients: string[],
    public steps: string[],
    public isGlutenFree: boolean,
    public isVegan: boolean,
    public isVegetarian: boolean,
    public isLactoseFree: boolean
  ) {}
}

// class Meal {
//   constructor(
//     public id: string,
//     public categoryIds: string[],
//     public title: string,
//     public author: string,
//     public affordability: string,
//     public complexity: string,
//     public imageUrl: string,
//     public duration: number,
//     public serving: number,
//     public ingredients: [{ amount: number; unit?: string; name: string }],
//     public preparationSteps: string[],
//     public cookingSteps: [{ main: string; note?: string; duration?: number }],
//     public isGlutenFree: boolean,
//     public isVegan: boolean,
//     public isVegetarian: boolean,
//     public isLactoseFree: boolean
//   ) {}
// }

export default Meal;
