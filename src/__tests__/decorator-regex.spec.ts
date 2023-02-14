/**
 * @file Unit Tests - DECORATOR_REGEX
 * @module decorator-regex/tests/unit/DECORATOR_REGEX
 */

import { dedent } from 'ts-dedent'
import TEST_SUBJECT from '../decorator-regex'

describe('unit:DECORATOR_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
  })

  describe('comments', () => {
    it('should ignore matches in multi-line comments', () => {
      // Arrange
      const code: string = dedent`
        /**
         * @example
         *  @Injectable()
         *  class UsersService {
         *    constructor(@InjectModel(User) readonly repo: typeof User) {}
         *  }
         */
      `

      // Act + Expect
      expect(TEST_SUBJECT.test(code)).to.be.false
    })

    it('should ignore matches in single-line comments', () => {
      expect(TEST_SUBJECT.test('// @Injectable()')).to.be.false
    })
  })

  describe('decorators', () => {
    it('should match multi-line decorators', () => {
      // Arrange
      const code: string = dedent`
        /**
         * [Data access object][1] for the {@linkcode DatabaseTable.USERS}
         * table.
         *
         * [1]: https://en.wikipedia.org/wiki/Data_access_object
         *
         * @extends {Entity<IUserRaw,CreateUserDTO,IUser>}
         * @implements {IUser}
         */
        @Table<User>({
          defaultScope: {
            attributes: User.KEYS,
            order: [['id', OrderDirection.ASC]],
            raw: false
          },
          deletedAt: false,
          hooks: {
            /**
             * Normalizes data before a user is persisted to the database.
             *
             * This includes:
             *
             * - Trimming string fields and forcing those fields to be
             *   lowercased
             * - Setting defaults for users registered with an
             *   {@linkcode OAuthProvider}
             *
             * @param {User} instance - Current user instance
             * @return {void} Nothing when complete
             */
            beforeSave(instance: User): void {
              trimmedLowercasedFields(instance.dataValues)

              if (User.AUTH_PROVIDERS.includes(instance.provider!)) {
                instance.email_verified = true
                instance.password = null
              }
            }
          },
          omitNull: false,
          paranoid: false,
          tableName: DatabaseTable.USERS,
          timestamps: true
        })
          class User
            extends Entity<IUserRaw, CreateUserDTO, IUser> implements IUser {
            @ApiProperty({
              description: 'When user was created', type: Number
            })
            @Column({
              allowNull: false,
              defaultValue: User.CURRENT_TIMESTAMP,
              type: DataType.BIGINT,
              validate: { isUnixTimestamp: User.isUnixTimestamp }
            })
            declare created_at: IUser['created_at']

            @ApiProperty({
              description: 'Email address',
              maxLength: 254,
              minLength: 3,
              type: String
            })
            @Column({
              allowNull: false,
              type: DataType.STRING(254),
              unique: true,
              validate: { isEmail: true, len: [3, 254] }
            })
            declare email: IUser['email']

            @ApiProperty({
              description: 'Unique identifier', type: Number
            })
            @Column({
              allowNull: false,
              autoIncrementIdentity: true,
              defaultValue: Sequelize.fn('nextval', DatabaseSequence.USERS),
              primaryKey: true,
              type: 'NUMERIC',
              unique: true,
              validate: { notNull: true }
            })
            declare id: IUser['id']

            @ApiProperty({
              description: 'Authentication provider',
              enum: OAuthProvider,
              enumName: 'OAuthProvider',
              nullable: true
            })
            @Column({
              allowNull: true,
              defaultValue: null,
              type: DataType.ENUM(...User.AUTH_PROVIDERS)
            })
            declare provider: IUser['provider']

            @HasMany(() => {
              return Token
            })
            declare tokens: Token[]

            /**
             * Returns the user's full name.
             *
             * @return {IUser['full_name']} User's full name or \`null\`
             */
            @ApiProperty({
              description: 'Full name (virtual property)'
            })
            @Column(DataType.VIRTUAL(DataType.STRING, [
              'first_name',
              'last_name'
            ]))
            get full_name(): IUser['full_name'] {
              if (!this.first_name && !this.last_name) return null
              return \`\${this.first_name} $\{this.last_name}\`.trim()
            }
          }
      `

      // Act + Expect
      expect([...code.matchAll(TEST_SUBJECT)]).toMatchSnapshot()
    })

    it('should match single-line decorators', () => {
      // Arrange
      const code: string = dedent`
        @Injectable()
        class UsersService {
          @logged accessor init = 1

          /**
           * @static
           * @readonly
           * @property {string} CACHE_KEY - Cache key
           */
          static readonly CACHE_KEY: string = '/' + ApiEndpoint.USERS

          constructor(
            @InjectModel(User) protected readonly repo: typeof User,
            protected readonly sequelize: Sequelize,
            @Inject(CACHE_MANAGER) protected readonly cache: RedisCache,
            protected readonly email: EmailService
          ) {}
        }


        @Controller(OPENAPI.controller)
        @ApiTags(...OPENAPI.tags)
        @UseInterceptors(HttpCacheInterceptor)
        class UsersController {
          constructor(protected readonly users: UsersService) {}

          @UseGuards(JwtAuthGuard)
          @Delete(OPENAPI.delete.path)
          @HttpCode(OPENAPI.delete.status)
          @ApiTokenAuth()
          @ApiResponses(OPENAPI.delete.responses)
          async delete(@Param('uid') uid: UserUid): Promise<UserDTO> {
            return this.users.remove(uid)
          }

          @CacheTTL(120)
          @Get(OPENAPI.findOne.path)
          @HttpCode(OPENAPI.findOne.status)
          @ApiQuery(OPENAPI.findOne.query)
          @ApiResponses(OPENAPI.findOne.responses)
          async findOne(@Param('uid') uid: UserUid, @Query(new ValidationPipe({ transform: true })) query: QueryParams<User> = {}): Promise<UserDTO> {
            return (await this.users.findOne(
              uid,
              this.users.getSearchOptions({ ...query, rejectOnEmpty: true })
            ))!
          }
        }
      `

      // Act + Expect
      expect([...code.matchAll(TEST_SUBJECT)]).toMatchSnapshot()
    })
  })
})
