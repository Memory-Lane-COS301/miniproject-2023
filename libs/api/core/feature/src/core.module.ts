import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { MemoriesModule } from '@mp/api/memories/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, EventstoreModule, ProfilesModule, UsersModule, MemoriesModule],
})
export class CoreModule {}
