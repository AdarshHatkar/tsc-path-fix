export interface Schema {
  models: {
    User: {
      name: string;
      fields: {
        id: { type: string };
        name: { type: string };
        email: { type: string };
      };
    };
  };
}

export const schema: Schema;
