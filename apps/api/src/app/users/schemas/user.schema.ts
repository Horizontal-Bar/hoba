import {Prop, SchemaFactory, Schema, ModelDefinition} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    login: string;

    @Prop({unique: true})
    firstName: string;

    @Prop({unique: true})
    middleName: string;

    @Prop()
    lastName: string;

    @Prop()
    avatarUrl: string;
}

export const UserModelDefinition: ModelDefinition = {
    name: User.name,
    schema: SchemaFactory.createForClass(User),
};
