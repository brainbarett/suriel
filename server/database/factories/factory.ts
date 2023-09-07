import FactoryGirl from 'factory-girl';

const factory = FactoryGirl.factory;

/** @ts-ignore */
const adapter = new FactoryGirl.SequelizeAdapter();
factory.setAdapter(adapter);

export default factory;
