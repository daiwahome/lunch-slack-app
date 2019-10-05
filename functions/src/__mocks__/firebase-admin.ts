import * as admin from 'firebase-admin'
import { Mock } from 'typemoq'
import { Bucket } from '@google-cloud/storage'

const firebase = {
    initializeApp: (): void => undefined,
    storage: (app?: admin.app.App): admin.storage.Storage => {
        const storage = Mock.ofType<admin.storage.Storage>()
        storage.setup(x => x.bucket())
            .returns(() => Mock.ofType<Bucket>().object)
        return storage.object
    }
}

export = firebase
