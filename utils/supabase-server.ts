import {cookies, headers} from 'next/headers'
import {createServerComponentSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {Database} from '../db_types'

export default () =>
    createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
