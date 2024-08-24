import { atom, selector } from 'recoil'
import { User } from '../../types/user'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userState = atom<User>({
  key: 'user',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
})

export const userInitialsSelector = selector<string>({
  key: 'userInitials',
  get: ({ get }) => {
    const username = get(userState).name;
    return username.split(' ')[0][0] + username.split(' ')[1][0];
  },
})

export const userIdSelector = selector<User['_id']>({
  key: 'userId',
  get: ({ get }) => {
    return get(userState)._id
  },
})

export const isUserPremiumSelector = selector<User['isPremium']>({
  key: 'isUserPremium',
  get: ({ get }) => {
    return get(userState)?.isPremium
  },
})
