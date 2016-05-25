import blocked from 'blocked'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

blocked((ms) => console.log(`--> blocked for ${ms} ms`), { threshold: 10 })
