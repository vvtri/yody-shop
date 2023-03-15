import { Body, Controller, Patch } from '@nestjs/common'
import { User } from '../../auth/entities/user.entity'
import { Authenticate, GetUser } from '../../common/decorators/auth.decorator'
import { ChangePasswordDto } from './dtos/change-password.dto'
import { ChangeUserInfoDto } from './dtos/change-user-info.dto'
import { UserService } from './user.service'

@Controller('user')
@Authenticate()
export class UserController {
	constructor(private userService: UserService) {}

	@Patch('change-info')
	changeUserInfo(@Body() body: ChangeUserInfoDto, @GetUser() user: User) {
		return this.userService.changeUserInfo(body, user)
	}

  @Patch('change-password')
  changeUserPassword(@Body() body: ChangePasswordDto, @GetUser() user: User) {
    return this.userService.changePassword(body, user)
  }
}
