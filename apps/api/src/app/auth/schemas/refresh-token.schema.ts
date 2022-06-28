import {ModelDefinition, Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

@Schema()
export class RefreshToken extends Document {
    @Prop({type: [Types.ObjectId], ref: 'User'})
    user: string;

    @Prop()
    token: string;

    @Prop()
    expiresIn: string;

    @Prop()
    blocked: boolean;

    @Prop()
    meta?: string;
}

export const RefreshTokenModelDefinition: ModelDefinition = {
    name: RefreshToken.name,
    schema: SchemaFactory.createForClass(RefreshToken),
};
